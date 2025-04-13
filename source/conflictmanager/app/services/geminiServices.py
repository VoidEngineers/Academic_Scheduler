import os
import json
import google.generativeai as genai
from app import app

# Correct path to prompt.txt
prompt_file = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'assets', 'prompt.txt')

def get_conflict_from_gemini(schedules):
    # Configure Gemini API with your key
    genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

    # Load the prompt from the file (system instruction)
    if not os.path.exists(prompt_file):
        raise FileNotFoundError(f"Prompt file not found: {prompt_file}")

    with open(prompt_file, 'r') as file:
        system_prompt = file.read()

    app.logger.debug(f"System Prompt: {system_prompt}")

    # Initialize the generative model
    model = genai.GenerativeModel("gemini-2.5-pro-exp-03-25")

    # Convert schedules to JSON string if it’s a dict
    if isinstance(schedules, dict):
        schedules = json.dumps(schedules)

    # Structure contents with system-like instruction followed by user input
    contents = [
        {
            "role": "user",
            "parts": [{"text": system_prompt}]  # System-like instruction
        },
        {
            "role": "user",
            "parts": [{"text": f"```json\n{schedules}\n```"}]  # User input with schedules
        }
    ]

    # Generation configuration
    generation_config = {
        "response_mime_type": "text/plain",
        "temperature": 0.7,  # Adjust as needed
    }

    # Generate content from the model
    try:
        response = model.generate_content(
            contents=contents,
            generation_config=generation_config
        )
    except Exception as e:
        app.logger.error(f"Gemini API call failed: {str(e)}")
        return {"error": f"Gemini API error: {str(e)}"}, 500

    # app.logger.debug(f"Raw Gemini Response: {response}")
    
    # Extract the text response and parse it
    response_text = response.text.strip()
    # app.logger.debug(f"Response Text: {response_text}")
    
    # Check if the response is wrapped in ```json markers and extract the JSON content
    if response_text.startswith("```json") and response_text.endswith("```"):
        json_str = response_text[len("```json"): -len("```")].strip()
    else:
        json_str = response_text

    try:
        # Parse the JSON string into a Python dictionary
        response_data = json.loads(json_str)
        # Extract the 'conflicts' array (assuming the response follows this structure)
        conflicts_array = response_data.get("conflicts", [])
        
        # app.logger.debug(f"Parsed Conflicts: {json.dumps(conflicts_array, indent=4)}")
        
        if not conflicts_array:
            app.logger.warning("No conflicts found in response or 'conflicts' key missing.")
        
        return conflicts_array, 200  # Return the conflicts as a Python list with status
    except json.JSONDecodeError as e:
        app.logger.error(f"Failed to parse response as JSON: {response_text}")
        return {"error": f"Invalid JSON response from Gemini: {str(e)}", "raw_response": response_text}, 500