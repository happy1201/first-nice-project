import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Users, Award, TrendingUp, Heart, Lightbulb } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description:
        "We're committed to delivering the highest quality education and maintaining industry-leading standards.",
    },
    {
      icon: Heart,
      title: "Student Success",
      description:
        "Your success is our success. We go above and beyond to ensure every learner achieves their goals.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We continuously update our curriculum and teaching methods to stay ahead of industry trends.",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "Building a supportive learning community where everyone can grow and thrive together.",
    },
  ];

  const milestones = [
    { year: "2018", title: "Founded", description: "Started with a vision to democratize tech education" },
    { year: "2019", title: "1,000 Students", description: "Reached our first major milestone" },
    { year: "2021", title: "Industry Partnerships", description: "Partnered with leading tech companies" },
    { year: "2023", title: "15,000+ Graduates", description: "Helped thousands transform their careers" },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 lg:pt-32 pb-16 lg:pb-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold">
              Transforming Careers Through Education
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground">
              We believe that quality education should be accessible to everyone.
              Our mission is to empower learners worldwide with the skills they
              need to succeed in the digital economy.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "15,000+", label: "Graduates" },
              { value: "50+", label: "Expert Instructors" },
              { value: "100+", label: "Courses" },
              { value: "85%", label: "Job Placement Rate" },
            ].map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-4xl lg:text-5xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold">Our Mission</h2>
              <p className="text-lg text-muted-foreground">
                At Khushal's Trial, we're on a mission to bridge the gap between
                education and employment. We provide industry-relevant, hands-on
                training that prepares our students for real-world challenges.
              </p>
              <p className="text-lg text-muted-foreground">
                Our courses are designed by industry experts and updated
                regularly to reflect the latest trends and technologies. We
                believe in learning by doing, which is why every course includes
                practical projects and real-world applications.
              </p>
              <Button size="lg" asChild>
                <Link to="/courses">Explore Our Courses</Link>
              </Button>
            </div>

            <div className="grid gap-6">
              {[
                {
                  icon: Target,
                  title: "Industry-Relevant Curriculum",
                  description: "Content updated quarterly to match market demands",
                },
                {
                  icon: Award,
                  title: "Recognized Certifications",
                  description: "Certificates valued by top companies globally",
                },
                {
                  icon: TrendingUp,
                  title: "Career Support",
                  description: "Job placement assistance and interview prep",
                },
              ].map((item, index) => (
                <Card key={index} className="p-6 hover-lift">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These core values guide everything we do and shape the learning
              experience we provide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center hover-lift">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From a small startup to a leading ed-tech platform
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0 w-24 text-right">
                    <div className="text-2xl font-bold text-primary">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-primary"></div>
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 h-full bg-border mt-2"></div>
                    )}
                  </div>
                  <Card className="flex-1 p-6 mb-8">
                    <h3 className="font-semibold text-xl mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {milestone.description}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <Card className="p-8 lg:p-12 text-center gradient-hero text-primary-foreground">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Join Our Community?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Become part of a thriving community of learners and start your
              journey to success today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/courses">Browse Courses</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
