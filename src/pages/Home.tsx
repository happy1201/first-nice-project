import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CourseCard from "@/components/CourseCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Award,
  Clock,
  TrendingUp,
  Users,
  CheckCircle2,
  Star,
  ArrowRight,
} from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import courseCloud from "@/assets/course-cloud.jpg";
import courseFullstack from "@/assets/course-fullstack.jpg";
import courseDatascience from "@/assets/course-datascience.jpg";
import courseDevops from "@/assets/course-devops.jpg";

const Home = () => {
  const featuredCourses = [
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
  ];

  const stats = [
    { icon: Users, value: "15,000+", label: "Active Learners" },
    { icon: Award, value: "95%", label: "Success Rate" },
    { icon: TrendingUp, value: "85%", label: "Job Placement" },
    { icon: Clock, value: "24/7", label: "Support Available" },
  ];

  const benefits = [
    "Lifetime access to course materials",
    "Industry-recognized certificates",
    "Expert instructor support",
    "Real-world projects portfolio",
    "Job placement assistance",
    "Money-back guarantee",
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Cloud Engineer at TCS",
      content:
        "The Cloud Engineering bootcamp transformed my career. Within 3 months of completing the course, I landed my dream job!",
      rating: 5,
    },
    {
      name: "Rahul Verma",
      role: "Full Stack Developer at Infosys",
      content:
        "Best investment I've made in my career. The instructors are amazing and the course content is always up-to-date.",
      rating: 5,
    },
    {
      name: "Ananya Reddy",
      role: "Data Scientist at Wipro",
      content:
        "Practical, hands-on learning that actually prepared me for real-world challenges. Highly recommended!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 lg:space-y-8 animate-fade-in">
              <Badge className="w-fit bg-accent/10 text-accent hover:bg-accent/20">
                🎓 Transform Your Career Today
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Master In-Demand Skills with{" "}
                <span className="text-primary">Industry Experts</span>
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-xl">
                Join thousands of learners who have accelerated their careers
                with our comprehensive, hands-on courses designed for real-world
                success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="text-base">
                  <Link to="/courses">
                    Explore Courses <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-base">
                  <Link to="/contact">Get Free Consultation</Link>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
                {[
                  "Lifetime Access",
                  "Money-back",
                  "Instructor-led",
                  "Certificate",
                ].map((badge) => (
                  <div
                    key={badge}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    <span>{badge}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="relative rounded-2xl overflow-hidden shadow-custom-lg">
                <img
                  src={heroImage}
                  alt="Students learning online"
                  className="w-full h-auto"
                />
              </div>
              {/* Floating Stats Card */}
              <Card className="absolute -bottom-6 -left-6 p-6 shadow-custom-md hidden lg:block">
                <div className="flex items-center gap-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">15,000+</div>
                    <div className="text-sm text-muted-foreground">
                      Active Learners
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center space-y-2 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-2">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Featured Courses
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start learning with our most popular courses designed to help you
              achieve your career goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link to="/courses">
                View All Courses <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold">
                Why Choose Learnify?
              </h2>
              <p className="text-lg text-muted-foreground">
                We're committed to providing the best learning experience with
                comprehensive support and resources to ensure your success.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-base">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" asChild>
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>

            <div className="grid gap-6">
              <Card className="p-6 hover-lift">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Industry Recognition
                    </h3>
                    <p className="text-muted-foreground">
                      Our certificates are recognized by leading tech companies
                      worldwide
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-lift">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Career Growth
                    </h3>
                    <p className="text-muted-foreground">
                      85% of our students report career advancement within 6
                      months
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-lift">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Community Support
                    </h3>
                    <p className="text-muted-foreground">
                      Join our thriving community of learners and industry experts
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold">
              What Our Students Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real success stories from learners who transformed their careers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 space-y-4 hover-lift">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground italic">
                  "{testimonial.content}"
                </p>
                <div className="pt-4 border-t border-border">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-6 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Join thousands of learners who are already advancing their careers.
            Get started today with our industry-leading courses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="text-base">
              <Link to="/courses">Browse All Courses</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-base bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link to="/contact">Talk to Our Team</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
