
import { ArrowLeft, Calendar, Users, TrendingUp, Target, Lightbulb, Award, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CaseStudy2 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-mist">
      {/* Header */}
      <div className="bg-forest-dark text-white py-8">
        <div className="max-w-4xl mx-auto px-6">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center space-x-2 text-sage hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            <span>Back to Portfolio</span>
          </button>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Market Expansion Strategy</h1>
          <p className="text-xl text-mist">Growing SaaS Company</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Executive Summary */}
        <section className="bg-white rounded-xl p-8 shadow-lg mb-12">
          <h2 className="text-3xl font-bold text-forest-dark mb-6">Executive Summary</h2>
          <p className="text-lg text-forest-medium leading-relaxed">
            Developed and executed a comprehensive international market expansion strategy for a successful 
            domestic SaaS company. The initiative successfully launched operations in three new markets, 
            generating $2.5M in international revenue while establishing local teams and strategic partnerships.
          </p>
        </section>

        {/* The Challenge */}
        <section className="bg-white rounded-xl p-8 shadow-lg mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <Target className="text-cedar" size={28} />
            <h2 className="text-3xl font-bold text-forest-dark">The Challenge</h2>
          </div>
          <div className="space-y-4 text-forest-medium">
            <p>
              A thriving domestic SaaS company had reached market saturation in their home country and needed 
              to expand internationally to continue growth. However, they faced significant challenges:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>No established framework for international market entry</li>
              <li>Limited understanding of target market cultures and business practices</li>
              <li>Lack of local presence and credibility in target markets</li>
              <li>Product localization requirements for different regions</li>
              <li>Regulatory compliance and legal considerations</li>
              <li>Need to build relationships with local partners and vendors</li>
            </ul>
          </div>
        </section>

        {/* The Solution */}
        <section className="bg-white rounded-xl p-8 shadow-lg mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <Lightbulb className="text-sage" size={28} />
            <h2 className="text-3xl font-bold text-forest-dark">The Solution</h2>
          </div>
          <div className="space-y-6 text-forest-medium">
            <p>
              I created a systematic approach to international expansion that balanced global consistency 
              with local market adaptation:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-sage/10 rounded-lg p-6">
                <h3 className="font-bold text-forest-dark mb-3">Market Research & Analysis</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Comprehensive market sizing and opportunity assessment</li>
                  <li>• Competitive landscape analysis in target regions</li>
                  <li>• Cultural and business practice research</li>
                  <li>• Regulatory and compliance requirement mapping</li>
                </ul>
              </div>
              
              <div className="bg-moss/10 rounded-lg p-6">
                <h3 className="font-bold text-forest-dark mb-3">Product Localization</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Multi-language platform development</li>
                  <li>• Currency and payment method integration</li>
                  <li>• Local compliance feature implementation</li>
                  <li>• Regional user experience optimization</li>
                </ul>
              </div>
              
              <div className="bg-cedar/10 rounded-lg p-6">
                <h3 className="font-bold text-forest-dark mb-3">Partnership Development</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Strategic partner identification and vetting</li>
                  <li>• Channel partnership agreements</li>
                  <li>• Local vendor and service provider relationships</li>
                  <li>• Integration and technology partnerships</li>
                </ul>
              </div>
              
              <div className="bg-forest-light/10 rounded-lg p-6">
                <h3 className="font-bold text-forest-dark mb-3">Team Building</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Local talent acquisition strategy</li>
                  <li>• Regional leadership hiring</li>
                  <li>• Cross-cultural training programs</li>
                  <li>• Remote team integration processes</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Timeline */}
        <section className="bg-white rounded-xl p-8 shadow-lg mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <Globe className="text-moss" size={28} />
            <h2 className="text-3xl font-bold text-forest-dark">Implementation Timeline</h2>
          </div>
          
          <div className="space-y-6">
            <div className="border-l-4 border-sage pl-6">
              <h3 className="font-bold text-forest-dark">Months 1-3: Foundation</h3>
              <p className="text-forest-medium">Market research, competitive analysis, and regulatory assessment for target markets.</p>
            </div>
            <div className="border-l-4 border-moss pl-6">
              <h3 className="font-bold text-forest-dark">Months 4-6: Preparation</h3>
              <p className="text-forest-medium">Product localization, partnership negotiations, and initial team hiring.</p>
            </div>
            <div className="border-l-4 border-cedar pl-6">
              <h3 className="font-bold text-forest-dark">Months 7-9: Launch</h3>
              <p className="text-forest-medium">Soft launch in first market, iterative improvements, and partnership activation.</p>
            </div>
            <div className="border-l-4 border-forest-medium pl-6">
              <h3 className="font-bold text-forest-dark">Months 10-12: Scale</h3>
              <p className="text-forest-medium">Full market launch, expansion to additional markets, and performance optimization.</p>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="bg-white rounded-xl p-8 shadow-lg mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <Award className="text-moss" size={28} />
            <h2 className="text-3xl font-bold text-forest-dark">Results Achieved</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-forest-dark mb-4">Financial Impact</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="text-sage" size={20} />
                  <span className="text-forest-medium">Generated $2.5M in international revenue</span>
                </div>
                <div className="flex items-center space-x-3">
                  <TrendingUp className="text-sage" size={20} />
                  <span className="text-forest-medium">Achieved 15% market share in primary target market</span>
                </div>
                <div className="flex items-center space-x-3">
                  <TrendingUp className="text-sage" size={20} />
                  <span className="text-forest-medium">ROI of 180% within first year</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-forest-dark mb-4">Operational Success</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="text-sage" size={20} />
                  <span className="text-forest-medium">Successfully launched in 3 new markets</span>
                </div>
                <div className="flex items-center space-x-3">
                  <TrendingUp className="text-sage" size={20} />
                  <span className="text-forest-medium">Built local teams in key regions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <TrendingUp className="text-sage" size={20} />
                  <span className="text-forest-medium">Established strategic partnerships with 8+ vendors</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Insights */}
        <section className="bg-sage/10 rounded-xl p-8 border border-sage/20">
          <h2 className="text-3xl font-bold text-forest-dark mb-6">Key Insights & Lessons Learned</h2>
          <div className="space-y-4 text-forest-medium">
            <p className="italic text-lg">
              "International expansion requires deep cultural sensitivity and local partnerships. 
              The key was balancing global consistency with local adaptation."
            </p>
            <div className="space-y-3">
              <p><strong>Local Partnerships Are Essential:</strong> Success depended heavily on finding the right local partners who understood both the market and our values.</p>
              <p><strong>Cultural Nuance Matters:</strong> What works in one market doesn't automatically translate to another, even with similar business environments.</p>
              <p><strong>Invest in Local Talent:</strong> Hiring local leaders early provided invaluable insights and credibility in new markets.</p>
              <p><strong>Regulatory Compliance is Non-Negotiable:</strong> Understanding and adhering to local regulations from day one prevented costly setbacks.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CaseStudy2;
