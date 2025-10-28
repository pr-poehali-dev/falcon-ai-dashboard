import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const commodities = [
  { id: 'steel', label: 'Steel' },
  { id: 'gold', label: 'Gold' },
  { id: 'iron-ore', label: 'Iron ore' },
  { id: 'coal', label: 'Coal' },
  { id: 'freight', label: 'Freight' },
  { id: 'fertilizers', label: 'Fertilizers' },
];

const generateChartData = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    value: Math.floor(Math.random() * 40) + 60,
  }));
};

const Index = () => {
  const [selectedCommodities, setSelectedCommodities] = useState<string[]>([]);
  const [insights, setInsights] = useState('');
  const [question, setQuestion] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);

  const handleCommodityToggle = (commodityId: string) => {
    setSelectedCommodities((prev) =>
      prev.includes(commodityId)
        ? prev.filter((id) => id !== commodityId)
        : [...prev, commodityId]
    );
  };

  const handleAsk = () => {
    if (question.trim()) {
      setChartData(generateChartData());
      setShowResults(true);
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 space-y-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img 
              src="https://cdn.poehali.dev/files/13d91062-5ba2-47ce-a633-89284cacb64f.png" 
              alt="Falcon AI Logo" 
              className="w-16 h-16"
            />
            <h1 className="text-3xl font-semibold text-slate-600">Falcon AI</h1>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-[#1A1F2C]">Inclosures</h2>
            <div className="space-y-3">
              {commodities.map((commodity) => (
                <div key={commodity.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={commodity.id}
                    checked={selectedCommodities.includes(commodity.id)}
                    onCheckedChange={() => handleCommodityToggle(commodity.id)}
                    className="border-2 border-gray-300"
                  />
                  <label
                    htmlFor={commodity.id}
                    className="text-sm font-medium text-gray-700 cursor-pointer select-none"
                  >
                    {commodity.label}
                  </label>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4">
              <Button
                variant="outline"
                className="w-full justify-start text-left font-medium border-2 hover:bg-gray-50"
              >
                Request model
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-medium border-2 hover:bg-gray-50"
              >
                Request research
              </Button>
            </div>
          </div>
        </div>


      </aside>

      <main className="flex-1 flex">
        <div className="flex-1 p-8 border-r border-gray-200">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[#1A1F2C]">Last market updates</h2>
              <div className="grid grid-cols-3 gap-4">
                <Card className="p-4 bg-gray-50 border-gray-200">
                  <p className="text-sm text-gray-600">Market placeholder</p>
                </Card>
                <Card className="p-4 bg-gray-50 border-gray-200">
                  <p className="text-sm text-gray-600">Market placeholder</p>
                </Card>
                <Card className="p-4 bg-gray-50 border-gray-200">
                  <p className="text-sm text-gray-600">Market placeholder</p>
                </Card>
              </div>
            </div>

            <div className="space-y-3 pb-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-[#1A1F2C]">
                Your daily insights
              </h2>
              <p className="text-sm text-gray-600">{getCurrentDate()}</p>
            </div>

            <Textarea
              placeholder="Enter your daily insights..."
              value={insights}
              onChange={(e) => setInsights(e.target.value)}
              className="min-h-[200px] text-base border-2 border-gray-200 focus:border-[#0EA5E9] resize-none"
            />

            {showResults && (
              <Card className="p-8 space-y-6 animate-fade-in border-2 border-gray-100 shadow-lg">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold text-[#0EA5E9]">
                    AI Analysis Complete!
                  </h3>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#0EA5E9"
                        strokeWidth={3}
                        dot={{ fill: '#0EA5E9', r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-lg text-[#1A1F2C]">
                    Analyzed Commodities:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCommodities.length > 0 ? (
                      selectedCommodities.map((id) => {
                        const commodity = commodities.find((c) => c.id === id);
                        return (
                          <span
                            key={id}
                            className="px-4 py-2 bg-[#0EA5E9] text-white rounded-full text-sm font-medium"
                          >
                            {commodity?.label}
                          </span>
                        );
                      })
                    ) : (
                      <span className="text-gray-500 italic">No commodities selected</span>
                    )}
                  </div>
                </div>

                <div className="border-t-2 border-gray-100 pt-4">
                  <p className="text-sm text-gray-600 text-center">
                    <span className="font-semibold">Data Sources:</span> S&P Global,
                    Bloomberg, Thomson Reuters
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>

        <aside className="w-96 bg-white p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-[#1A1F2C] mb-4">
              How can I help you?
            </h2>
            <Textarea
              placeholder="Ask a question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-[120px] text-base border-2 border-gray-200 focus:border-gray-400 resize-none mb-4"
            />
            <Button
              onClick={handleAsk}
              className="w-full py-6 text-lg font-semibold bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition-all duration-200"
            >
              Ask
            </Button>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Index;