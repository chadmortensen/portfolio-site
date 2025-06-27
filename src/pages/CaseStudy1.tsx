
import { ArrowLeft, Calendar, Users, TrendingUp, Target, Lightbulb, Award, Baby } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CaseStudy1 = () => {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mondrian-navy text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back to Portfolio</span>
          </button>
          
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">A rapid revamp to the Walmart registry</h1>
              <p className="text-2xl text-white/90 mb-6">Walmart</p>
              
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2 text-white/80">
                  <Calendar size={20} />
                  <span className="text-lg">1 quarter</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <Users size={20} />
                  <span className="text-lg">6 people</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-white/10 rounded-full p-12">
                <Baby className="text-white" size={80} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      <section className="mondrian-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-8">
                <Target className="text-mondrian-teal" size={32} />
                <h2 className="text-4xl font-bold text-mondrian-black">Executive Summary</h2>
              </div>
              <p className="text-xl text-mondrian-black leading-relaxed">
                In 1 quarter; design, develop and launch an improved baby registry experience addressing 
                shortcomings of the previous registry tool. This comprehensive redesign focused on increasing 
                quality registry creations, improving curation and sharing capabilities, and ultimately helping 
                new parents with this major moment in life.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="mondrian-teal/10 rounded-full p-12">
                <Baby className="text-mondrian-teal" size={80} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="mondrian-orange py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-4 mb-8">
            <Target className="text-white" size={32} />
            <h2 className="text-4xl font-bold text-white">The Challenge</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6 text-white">
              <p className="text-xl">
                In 1 quarter; design, develop and launch an improved baby registry experience addressing 
                shortcomings of the previous registry tool.
              </p>
              
              <div>
                <h3 className="text-2xl font-bold mb-6">Our goals and success metrics</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <TrendingUp className="text-white/80 mt-1 flex-shrink-0" size={20} />
                    <span className="text-lg">Increase quality registry creations (creations that lead to a first curation action)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <TrendingUp className="text-white/80 mt-1 flex-shrink-0" size={20} />
                    <span className="text-lg">Increase curation by 10%</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <TrendingUp className="text-white/80 mt-1 flex-shrink-0" size={20} />
                    <span className="text-lg">Increase sharing by 20%</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <TrendingUp className="text-white/80 mt-1 flex-shrink-0" size={20} />
                    <span className="text-lg">Increase purchase conversion by 25%</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <TrendingUp className="text-white/80 mt-1 flex-shrink-0" size={20} />
                    <span className="text-lg">Helping new parents with this major moment in life</span>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" 
                alt="The challenge"
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Assembling the Team */}
      <section className="mondrian-blue py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12">Assembling the Team</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80" 
                alt="Team collaboration"
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
            <div className="space-y-6 text-white">
              <p className="text-xl">I had 1 staff designer available from my team but I knew in order to pull this off I would need to expand the team</p>
              <ul className="space-y-3 text-lg">
                <li>• 6 weeks total allocated to design, from discovery to final deliverables</li>
                <li>• Bulk of work would be in the latter half of the quarter and we had the holiday season to account for</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* We Have a Team */}
      <section className="mondrian-teal py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12">We Have a Team!</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6 text-white">
              <p className="text-xl">
                After discussion and support from product and business partners I was able to convince design 
                leadership to shift some designers to our team and suggested utilizing a couple contractors 
                from our Columbian outsource team.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80" 
                alt="Team assembled"
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ground the Team in Research */}
      <section className="mondrian-coral py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12">Ground the Team in Research and Insights</h2>
          <div className="space-y-8 text-white">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-xl mb-6">
                  We had past research so let's not lose that in an effort to be efficient. Walmart registrant 
                  users have been asking for a greater level of control, guidance and trust within today's experience.
                </p>
                <p className="text-white/80">(UXR usability findings Jun 2019) (VoC Feedback)</p>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" 
                  alt="Research insights"
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-8 space-y-6">
              <blockquote className="italic text-xl text-white">
                "I became so frustrated in making the registry through the app, that I quit. It is not intuitive 
                nor easy to navigate in order to add or change something."
              </blockquote>
              
              <p className="font-medium text-lg">
                Almost half of moms don't want any help creating a registry - they want to take ownership of 
                their list and pick items that are relevant to their person needs (GCIA Oct 2019)
              </p>
              
              <blockquote className="italic text-xl text-white">
                "It's not as user friendly as other registries I've used. It would be better if the registry 
                picks fell into the categories provided. That would make it much easier."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Design Principles */}
      <section className="mondrian-navy py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12">Create Design Principles</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-xl text-white">
                Research backed design principles helped to focus the team
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80" 
                alt="Design principles"
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ideation Workshop */}
      <section className="mondrian-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-mondrian-black mb-12">Ideation Workshop - How Might We</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1473091534298-04dcbce3278c?auto=format&fit=crop&w=800&q=80" 
                alt="Workshop ideation"
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
            <div className="space-y-6 text-mondrian-black">
              <p className="text-xl">
                After planning the workshop with our staff designer I facilitated the group in generating a 
                list of potential areas of improvement within the experience.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="mondrian-teal/10 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-mondrian-black">8</div>
                  <div className="text-lg">Cross functional participants</div>
                </div>
                <div className="mondrian-orange/10 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-mondrian-black">70+</div>
                  <div className="text-lg">Ideas / HMWs</div>
                </div>
                <div className="mondrian-blue/10 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-mondrian-black">11</div>
                  <div className="text-lg">Categories</div>
                </div>
                <div className="mondrian-coral/10 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-mondrian-black">Top 3</div>
                  <div className="text-lg">Ranked categories</div>
                </div>
              </div>
              <p className="text-lg">Dot voting • Name and rank top 3 categories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Areas of Focus */}
      <section className="mondrian-orange py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12">Design + Product + Business Aligned on Our Areas of Focus</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80" 
                alt="Team alignment"
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
            <div className="space-y-6">
              <div className="bg-white/20 rounded-lg p-6">
                <h3 className="font-bold text-white text-xl mb-3">Improve Onboarding</h3>
                <p className="text-white/90">Pivot away from pre-population and manually pruning the pre-built registry. Create a 3-tier strategy for customization (no help → populated)</p>
              </div>
              
              <div className="bg-white/20 rounded-lg p-6">
                <h3 className="font-bold text-white text-xl mb-3">Improve Curation and Management</h3>
                <p className="text-white/90">Continue to provide easy access for making my registry public and to share it with others. Provide additional guidance and control by offering relevant recommendations within the registry experience</p>
              </div>
              
              <div className="bg-white/20 rounded-lg p-6">
                <h3 className="font-bold text-white text-xl mb-3">Improve Gifting</h3>
                <p className="text-white/90">Allow Gift Givers to easily find products that are available to purchase and apply ecommerce best practices</p>
              </div>
              
              <div className="bg-white/20 rounded-lg p-6">
                <h3 className="font-bold text-white text-xl mb-3">Improve Internal Processes</h3>
                <p className="text-white/90">Remove dependencies on engineering to support changes to pre-curated inventory</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Low to High Fidelity Design */}
      <section className="mondrian-blue py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12">Low to High Fidelity Design</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6 text-white">
              <p className="text-xl">
                Establishing a cadence of standups, reviews and critiques helped the team to continuously 
                receive direction and allowed me to help unblock moments of uncertainty.
              </p>
              <div className="bg-white/20 rounded-lg p-6">
                <ul className="space-y-3 text-lg">
                  <li>• Mon, Wed, Fri = Leadership Reviews</li>
                  <li>• Tue, Thur = Team Crit</li>
                  <li>• Daily standup = 15 min</li>
                </ul>
                <p className="text-white/80 mt-4">
                  Note: Later in the project we included product/engineering/design as part of reviews to reduce churn
                </p>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80" 
                alt="Design process"
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Examples of Enhancements */}
      <section className="mondrian-teal py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-12">Examples of Enhancements</h2>
          <img 
            src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80" 
            alt="Design enhancements"
            className="w-full h-96 object-cover rounded-lg"
          />
          <p className="text-white text-xl mt-6">Key design improvements and feature enhancements implemented throughout the registry experience.</p>
        </div>
      </section>

      {/* Constant Prioritization */}
      <section className="mondrian-coral py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12">Constant Prioritization</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" 
                alt="Prioritization process"
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
            <div className="space-y-6 text-white">
              <p className="text-xl">
                Partnered with my cross functional leaders (product, engineering) to constantly reassess the 
                scope and timelines, aggressively cutting and prioritizing features to fit the time allocated 
                for engineering.
              </p>
              <p className="text-xl">
                At times I needed to rally my partners and the teams to get them excited to build in features 
                that we thought would add delight and an extra layer of polish that was needed to build trust 
                with the customers of the product. So definitely some healthy negotiating.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="mondrian-navy py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-4 mb-12">
            <Award className="text-white" size={32} />
            <h2 className="text-4xl font-bold text-white">Results</h2>
          </div>
          
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80" 
                  alt="Results achieved"
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">So, how did the team do?</h3>
                <p className="text-xl text-white">
                  Overall everyone was very proud of the accomplishment and the updated baby registry that was created. 
                  This version of the baby registry closer met the needs of the customer and ultimately met the business goals.
                </p>
              </div>
            </div>
            
            <div className="bg-white/20 rounded-lg p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-white text-xl mb-6">Goals</h4>
                  <div className="space-y-4 text-white/90">
                    <div>Increase quality registry creations (creations that lead to a first curation action)</div>
                    <div>Increase curation by 10%</div>
                    <div>Increase sharing by 20%</div>
                    <div>Increase purchase conversion by 25%</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-white text-xl mb-6">Results</h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="text-white/80" size={20} />
                      <span className="text-white font-medium text-lg">+28% vs. Last year</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="text-white/80" size={20} />
                      <span className="text-white font-medium text-lg">70% edited within 3-7 days. +20% increase</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="text-white/80" size={20} />
                      <span className="text-white font-medium text-lg">55% shared within 7 days. +8% increase</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <TrendingUp className="text-white/80 mt-1" size={20} />
                      <span className="text-white font-medium text-lg">GMV initially increased but then decreased starting in April possibly due to COVID</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recap of Learnings */}
      <section className="mondrian-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-mondrian-black mb-8">Recap of Learnings</h2>
              <div className="space-y-4 text-mondrian-black">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="text-mondrian-teal mt-1 flex-shrink-0" size={20} />
                  <span className="text-lg">Established goals and how we will measure success</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Lightbulb className="text-mondrian-teal mt-1 flex-shrink-0" size={20} />
                  <span className="text-lg">High level estimates and sequencing the work</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Lightbulb className="text-mondrian-teal mt-1 flex-shrink-0" size={20} />
                  <span className="text-lg">Augment the team (1 design lead, 4 designers)</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Lightbulb className="text-mondrian-teal mt-1 flex-shrink-0" size={20} />
                  <span className="text-lg">Build empathy, learn from past research</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Lightbulb className="text-mondrian-teal mt-1 flex-shrink-0" size={20} />
                  <span className="text-lg">Ideate and iterate</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Lightbulb className="text-mondrian-teal mt-1 flex-shrink-0" size={20} />
                  <span className="text-lg">Constant partnership and prioritization to meet an aggressive timeline</span>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80" 
                alt="Key learnings"
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudy1;
