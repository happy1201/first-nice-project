import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal, X } from "lucide-react";
import courseCloud from "@/assets/course-cloud.jpg";
import courseFullstack from "@/assets/course-fullstack.jpg";
import courseDatascience from "@/assets/course-datascience.jpg";
import courseDevops from "@/assets/course-devops.jpg";
import courseAws from "@/assets/course-aws.jpg";
import courseUiux from "@/assets/course-uiux.jpg";

const Courses = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const allCourses = [
    {
      id: "cloud-engineering",
      title: "Cloud Engineering Bootcamp",
      description:
        "Master AWS, Azure, and GCP. Build scalable cloud infrastructure with hands-on projects.",
      thumbnail: courseCloud,
      price: "$199",
      originalPrice: "$299",
      rating: 4.8,
      reviewCount: 342,
      duration: "12 weeks",
      level: "Intermediate",
      studentCount: "2.3k",
    },
    {
      id: "full-stack-java",
      title: "Full Stack Java Development",
      description:
        "Complete full stack development with Spring Boot, React, and microservices architecture.",
      thumbnail: courseFullstack,
      price: "$179",
      originalPrice: "$249",
      rating: 4.9,
      reviewCount: 568,
      duration: "16 weeks",
      level: "Beginner",
      studentCount: "3.1k",
    },
    {
      id: "data-science-python",
      title: "Data Science with Python",
      description:
        "Learn data analysis, machine learning, and AI with Python, pandas, and scikit-learn.",
      thumbnail: courseDatascience,
      price: "$189",
      originalPrice: "$279",
      rating: 4.7,
      reviewCount: 421,
      duration: "14 weeks",
      level: "Intermediate",
      studentCount: "1.8k",
    },
    {
      id: "devops-essentials",
      title: "DevOps Essentials",
      description:
        "CI/CD pipelines, Docker, Kubernetes, and cloud deployment automation from scratch.",
      thumbnail: courseDevops,
      price: "$169",
      originalPrice: "$239",
      rating: 4.8,
      reviewCount: 297,
      duration: "10 weeks",
      level: "Intermediate",
      studentCount: "1.5k",
    },
    {
      id: "aws-solutions-architect",
      title: "AWS Certified Solutions Architect",
      description:
        "Prepare for AWS certification. Master cloud architecture design and best practices.",
      thumbnail: courseAws,
      price: "$229",
      originalPrice: "$329",
      rating: 4.9,
      reviewCount: 512,
      duration: "8 weeks",
      level: "Advanced",
      studentCount: "2.8k",
    },
    {
      id: "uiux-foundations",
      title: "UI/UX Design Foundations",
      description:
        "Learn user-centered design, prototyping, and modern design tools like Figma and Adobe XD.",
      thumbnail: courseUiux,
      price: "$149",
      originalPrice: "$199",
      rating: 4.6,
      reviewCount: 284,
      duration: "8 weeks",
      level: "Beginner",
      studentCount: "1.2k",
    },
  ];

  const categories = [
    "Cloud Computing",
    "Web Development",
    "Data Science",
    "DevOps",
    "Design",
    "Cybersecurity",
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Page Header */}
      <section className="pt-24 lg:pt-32 pb-12 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Explore Our Courses
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover industry-leading courses designed to accelerate your
              career. Filter by your interests and skill level.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Bar */}
      <section className="py-6 bg-card border-y border-border sticky top-16 lg:top-20 z-40">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="search"
                placeholder="Search courses..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Sort */}
            <Select defaultValue="popular">
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            {/* Filter Toggle (Mobile) */}
            <Button
              variant="outline"
              className="md:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
              {showFilters && <X className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside
              className={`lg:w-64 flex-shrink-0 ${
                showFilters ? "block" : "hidden lg:block"
              }`}
            >
              <div className="space-y-6 sticky top-40">
                {/* Level Filter */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Level</Label>
                  <div className="space-y-2">
                    {["All Levels", "Beginner", "Intermediate", "Advanced"].map(
                      (level) => (
                        <div key={level} className="flex items-center space-x-2">
                          <Checkbox id={level} />
                          <label
                            htmlFor={level}
                            className="text-sm cursor-pointer"
                          >
                            {level}
                          </label>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Category Filter */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Category</Label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox id={category} />
                        <label
                          htmlFor={category}
                          className="text-sm cursor-pointer"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Price</Label>
                  <div className="space-y-2">
                    {["All Prices", "Free", "Under $100", "$100 - $200", "Over $200"].map(
                      (price) => (
                        <div key={price} className="flex items-center space-x-2">
                          <Checkbox id={price} />
                          <label
                            htmlFor={price}
                            className="text-sm cursor-pointer"
                          >
                            {price}
                          </label>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Duration Filter */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Duration</Label>
                  <div className="space-y-2">
                    {["Any Duration", "0-4 weeks", "4-12 weeks", "12+ weeks"].map(
                      (duration) => (
                        <div key={duration} className="flex items-center space-x-2">
                          <Checkbox id={duration} />
                          <label
                            htmlFor={duration}
                            className="text-sm cursor-pointer"
                          >
                            {duration}
                          </label>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Clear All Filters
                </Button>
              </div>
            </aside>

            {/* Course Grid */}
            <div className="flex-1">
              <div className="mb-6">
                <p className="text-muted-foreground">
                  Showing {allCourses.length} courses
                </p>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {allCourses.map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>

              {/* Pagination could go here */}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Courses;
