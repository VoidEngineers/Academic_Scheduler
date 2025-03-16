import React, { useState } from "react";
import "../App.css";

const Courses = () => {
  const [activeTab, setActiveTab] = useState("Most popular");
  const [selectedRating, setSelectedRating] = useState(null);

  const featuredCourse = {
    title: "Microsoft DP-700 prep: Fabric Data Engineer Associate",
    description:
      "Learn PySpark, SQL, KQL and Fabric for DP-700 exam. Also helps with the AFL-3008, 3009 and 3010 Microsoft Applied Skills",
    instructor: "Phillip Burton",
    students: "880000+ students so far and 1 other",
    updatedDate: "March 2025",
    totalHours: "14.5",
    lectures: "159",
    level: "Intermediate",
    rating: 4.7,
    reviews: 185,
    image: "https://via.placeholder.com/800x400",
  };

  const popularCourses = [
    {
      id: 1,
      title: "Ultimate AWS Certified Solutions Architect Associate 2025",
      instructor: "Stephane Maarek | AWS Certified Cloud Practitioner",
      rating: 4.7,
      students: "251,855",
      image: "https://via.placeholder.com/300x200",
      badge: "AWS Certified Cloud Practitioner",
    },
    {
      id: 2,
      title: "[NEW] Ultimate AWS Certified Cloud Practitioner CLF-C02 2025",
      instructor: "Stephane Maarek | AWS Certified Cloud Practitioner",
      rating: 4.7,
      students: "241,585",
      image: "https://via.placeholder.com/300x200",
      badge: "AWS Certified Cloud Practitioner",
    },
    {
      id: 3,
      title: "Ultimate AWS Certified Developer Associate 2025 DVA-C02",
      instructor: "Stephane Maarek | AWS Certified Cloud Practitioner",
      rating: 4.7,
      students: "110,033",
      image: "https://via.placeholder.com/300x200",
      badge: "AWS Certified Cloud Practitioner",
    },
    {
      id: 4,
      title: "Certified Kubernetes Administrator (CKA) with Practice Tests",
      instructor: "Mumshad Mannambeth, KodeKloud Training",
      rating: 4.7,
      students: "79,639",
      image: "https://via.placeholder.com/300x200",
      badge: "CLOUD NATIVE ENDORSED CONTENT",
    },
  ];

  const topics = [
    "AWS Certified Solutions Architect - Associate",
    "AWS Certified Cloud Practitioner",
    "Amazon AWS",
    "AWS Certified AI Practitioner",
    "AWS Certified Developer - Associate",
  ];

  const filterOptions = {
    ratings: [
      { value: 4.5, label: "4.5 & up", count: 397 },
      { value: 4.0, label: "4.0 & up", count: 690 },
      { value: 3.5, label: "3.5 & up", count: 697 },
      { value: 3.0, label: "3.0 & up", count: 699 },
    ],
    videoDuration: [
      { label: "0-1 Hour", count: 87 },
      { label: "1-3 Hours", count: 93 },
      { label: "3-6 Hours", count: 171 },
      { label: "6-17 Hours", count: 249 },
    ],
  };

  return (
    <div className='courses-page'>
      {/* Sub Navigation */}
      <div className='sub-nav'>
        <div className='sub-nav-links'>
          <a href='#' className='active'>
            Cloud Computing
          </a>
          <a href='#'>Cloud Certifications</a>
          <a href='#'>Cloud Development</a>
        </div>
      </div>

      {/* Page Title */}
      <div className='page-container'>
        <h1 className='page-title'>Cloud Computing Courses</h1>

        {/* Featured Course Section */}
        <div className='featured-course-section'>
          <h2>Featured course</h2>
          <p className='section-subtitle'>
            Many learners enjoyed this highly rated course for its engaging
            content.
          </p>

          <div className='featured-course-card'>
            <div className='featured-course-image'>
              <img src={featuredCourse.image} alt={featuredCourse.title} />
            </div>
            <div className='featured-course-content'>
              <h3>{featuredCourse.title}</h3>
              <p className='course-description'>{featuredCourse.description}</p>
              <p className='instructor'>
                By {featuredCourse.instructor} • {featuredCourse.students}
              </p>
              <div className='course-meta'>
                <span>Updated {featuredCourse.updatedDate}</span>
                <span>{featuredCourse.totalHours} total hours</span>
                <span>{featuredCourse.lectures} lectures</span>
                <span>{featuredCourse.level}</span>
              </div>
              <div className='course-rating'>
                <span className='rating-number'>{featuredCourse.rating}</span>
                <span className='stars'>
                  {"★".repeat(Math.floor(featuredCourse.rating))}
                  {"☆".repeat(5 - Math.floor(featuredCourse.rating))}
                </span>
                <span className='reviews'>({featuredCourse.reviews})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Courses to Get Started Section */}
        <div className='get-started-section'>
          <h2>Courses to get you started</h2>
          <p className='section-subtitle'>
            Explore courses from experienced, real-world experts.
          </p>

          <div className='tabs'>
            <button
              className={activeTab === "Most popular" ? "active" : ""}
              onClick={() => setActiveTab("Most popular")}
            >
              Most popular
            </button>
            <button
              className={activeTab === "Trending" ? "active" : ""}
              onClick={() => setActiveTab("Trending")}
            >
              Trending
            </button>
          </div>

          <div className='courses-grid'>
            {popularCourses.map((course) => (
              <div key={course.id} className='course-card'>
                <div className='course-image'>
                  <img src={course.image} alt={course.title} />
                  {course.badge && (
                    <div className='course-badge'>{course.badge}</div>
                  )}
                </div>
                <div className='course-content'>
                  <h3>{course.title}</h3>
                  <p className='instructor'>{course.instructor}</p>
                  <div className='course-rating'>
                    <span className='rating-number'>{course.rating}</span>
                    <span className='stars'>
                      {"★".repeat(Math.floor(course.rating))}
                      {"☆".repeat(5 - Math.floor(course.rating))}
                    </span>
                    <span className='students'>({course.students})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Topics Section */}
        <div className='popular-topics-section'>
          <h2>Popular topics</h2>
          <div className='topics-grid'>
            {topics.map((topic, index) => (
              <a key={index} href='#' className='topic-card'>
                {topic}
              </a>
            ))}
          </div>
        </div>

        {/* All Courses Section */}
        <div className='all-courses-section'>
          <h2>All Cloud Computing courses</h2>

          <div className='courses-container'>
            {/* Filters Sidebar */}
            <div className='filters-sidebar'>
              <button className='filter-button'>
                <span>Filter</span>
              </button>

              <div className='sort-dropdown'>
                <select defaultValue='highest-rated'>
                  <option value='highest-rated'>Highest Rated</option>
                  <option value='most-popular'>Most Popular</option>
                  <option value='newest'>Newest</option>
                </select>
              </div>

              <div className='filter-section'>
                <h3>Ratings</h3>
                {filterOptions.ratings.map((rating, index) => (
                  <label key={index} className='filter-option'>
                    <input
                      type='radio'
                      name='rating'
                      checked={selectedRating === rating.value}
                      onChange={() => setSelectedRating(rating.value as any)}
                    />
                    <span className='stars'>
                      {"★".repeat(Math.floor(rating.value))}
                      {"☆".repeat(5 - Math.floor(rating.value))}
                    </span>
                    <span className='count'>({rating.count})</span>
                  </label>
                ))}
              </div>

              <div className='filter-section'>
                <h3>Video Duration</h3>
                {filterOptions.videoDuration.map((duration, index) => (
                  <label key={index} className='filter-option'>
                    <input type='checkbox' />
                    <span>{duration.label}</span>
                    <span className='count'>({duration.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Course Results */}
            <div className='course-results'>
              <div className='results-count'>704 results</div>
              {/* Course list items would go here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
