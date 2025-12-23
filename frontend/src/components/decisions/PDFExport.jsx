import React, { useState } from 'react';
import { Download, FileText, CheckCircle, Users, Calendar, TrendingUp } from 'lucide-react';

/**
 * PDF Export Component
 * Generates PDF reports using browser's print functionality
 */

// Generate PDF using browser print
const generatePDF = (decision, groupInfo) => {
  const printWindow = window.open('', '_blank');
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Decision Report - ${decision.title}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 40px;
          max-width: 800px;
          margin: 0 auto;
        }
        .header {
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          color: white;
          padding: 30px;
          border-radius: 10px;
          margin-bottom: 30px;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
        }
        .section {
          margin-bottom: 30px;
          page-break-inside: avoid;
        }
        .section h2 {
          color: #1e293b;
          border-bottom: 3px solid #3b82f6;
          padding-bottom: 10px;
          margin-bottom: 15px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 20px;
        }
        .info-item {
          background: #f8fafc;
          padding: 15px;
          border-radius: 8px;
          border-left: 4px solid #3b82f6;
        }
        .info-label {
          color: #64748b;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 5px;
        }
        .info-value {
          color: #0f172a;
          font-size: 18px;
          font-weight: 700;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 15px;
        }
        th, td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #e2e8f0;
        }
        th {
          background: #f1f5f9;
          font-weight: 600;
          color: #475569;
        }
        .alternative {
          background: #f8fafc;
          padding: 15px;
          margin: 10px 0;
          border-radius: 8px;
          border-left: 4px solid #8b5cf6;
        }
        .footer {
          margin-top: 50px;
          padding-top: 20px;
          border-top: 2px solid #e2e8f0;
          text-align: center;
          color: #64748b;
          font-size: 12px;
        }
        @media print {
          body { padding: 20px; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>📊 Group Decision Report</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Generated on ${new Date().toLocaleDateString()}</p>
      </div>

      <div class="section">
        <h2>Decision Information</h2>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Title</div>
            <div class="info-value">${decision.title || 'N/A'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Category</div>
            <div class="info-value">${decision.category || 'N/A'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Winner</div>
            <div class="info-value">🏆 ${decision.result || 'Pending'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Final Score</div>
            <div class="info-value">${decision.score || 'N/A'}/10</div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>Group Information</h2>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Group Name</div>
            <div class="info-value">${groupInfo.name || 'N/A'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Total Members</div>
            <div class="info-value">${groupInfo.memberCount || 0}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Total Decisions</div>
            <div class="info-value">${groupInfo.totalDecisions || 0}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Avg Satisfaction</div>
            <div class="info-value">${groupInfo.avgSatisfaction || 'N/A'}/10</div>
          </div>
        </div>
      </div>

      ${decision.reasoning ? `
        <div class="section">
          <h2>Decision Reasoning</h2>
          <p style="line-height: 1.6; color: #334155;">${decision.reasoning}</p>
        </div>
      ` : ''}

      ${decision.constraints && decision.constraints.length > 0 ? `
        <div class="section">
          <h2>Member Constraints</h2>
          <table>
            <thead>
              <tr>
                <th>Member</th>
                <th>Budget</th>
                <th>Dietary</th>
                <th>Satisfied</th>
              </tr>
            </thead>
            <tbody>
              ${decision.constraints.map(c => `
                <tr>
                  <td><strong>${c.member || 'N/A'}</strong></td>
                  <td>${c.budget || 'N/A'}</td>
                  <td>${c.dietary || 'N/A'}</td>
                  <td>${c.satisfied ? '✅ Yes' : '❌ No'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : ''}

      ${decision.alternatives && decision.alternatives.length > 0 ? `
        <div class="section">
          <h2>Alternative Options</h2>
          ${decision.alternatives.map(alt => `
            <div class="alternative">
              <strong style="font-size: 16px; color: #1e293b;">${alt.name || 'Option'}</strong>
              <p style="margin: 5px 0 0 0; color: #64748b;">Score: ${alt.score || 0}/10</p>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <div class="footer">
        <p>Generated by Group Decision Resolver</p>
        <p>${new Date().toLocaleString()}</p>
      </div>

      <div class="no-print" style="margin-top: 30px; text-align: center;">
        <button onclick="window.print()" style="
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          color: white;
          border: none;
          padding: 15px 40px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          margin-right: 10px;
        ">🖨️ Print / Save as PDF</button>
        <button onclick="window.close()" style="
          background: #e2e8f0;
          color: #475569;
          border: none;
          padding: 15px 40px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
        ">Close</button>
      </div>
    </body>
    </html>
  `;
  
  printWindow.document.write(htmlContent);
  printWindow.document.close();
};

const ExportButton = ({ onClick, loading, children, variant = 'primary' }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
      variant === 'primary'
        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
        : 'bg-white border-2 border-blue-500 text-blue-500 hover:bg-blue-50'
    }`}
  >
    {loading ? (
      <>
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
        Generating...
      </>
    ) : (
      <>
        <Download className="w-5 h-5" />
        {children}
      </>
    )}
  </button>
);

const InfoRow = ({ label, value, icon: Icon }) => (
  <div className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
    <span className="flex items-center gap-2 text-slate-600 font-medium">
      {Icon && <Icon className="w-4 h-4" />}
      {label}
    </span>
    <span className="text-slate-800 font-semibold">{value}</span>
  </div>
);

const PDFExportComponent = ({ decision, groupInfo, showPreview = true }) => {
  const [loading, setLoading] = useState(false);

  // Use provided data or mock data
  const decisionData = decision || {
    title: 'Sample Decision',
    category: 'General',
    result: 'Option A',
    score: 8.7,
    alternatives: [],
    reasoning: 'This is the best option',
    constraints: [],
    completedAt: new Date().toISOString()
  };

  const groupData = groupInfo || {
    name: 'Sample Group',
    memberCount: 0,
    totalDecisions: 0,
    avgSatisfaction: 0
  };

  const handleExportPDF = async () => {
    setLoading(true);
    
    setTimeout(() => {
      generatePDF(decisionData, groupData);
      setLoading(false);
    }, 500);
  };

  const handleExportCSV = () => {
    if (!decisionData.constraints || decisionData.constraints.length === 0) {
      alert('No constraint data to export');
      return;
    }

    const csvData = decisionData.constraints.map(c => 
      `"${c.member || ''}","${c.budget || ''}","${c.dietary || ''}","${c.satisfied ? 'Yes' : 'No'}"`
    ).join('\n');
    
    const header = 'Member,Budget,Dietary,Satisfied\n';
    const blob = new Blob([header + csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `decision_${decisionData.id || 'export'}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Export Buttons */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Export Report</h2>
        
        <div className="flex flex-wrap gap-4">
          <ExportButton onClick={handleExportPDF} loading={loading}>
            Export as PDF
          </ExportButton>
          <ExportButton onClick={handleExportCSV} variant="secondary">
            Export as CSV
          </ExportButton>
        </div>
      </div>

      {/* Preview */}
      {showPreview && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Decision Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                Decision Information
              </h3>
              <InfoRow label="Title" value={decisionData.title} icon={FileText} />
              <InfoRow label="Category" value={decisionData.category} icon={TrendingUp} />
              <InfoRow label="Winner" value={decisionData.result} icon={CheckCircle} />
              <InfoRow label="Final Score" value={`${decisionData.score}/10`} icon={TrendingUp} />
              {decisionData.completedAt && (
                <InfoRow 
                  label="Completed" 
                  value={new Date(decisionData.completedAt).toLocaleDateString()} 
                  icon={Calendar} 
                />
              )}
            </div>

            {/* Group Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                Group Information
              </h3>
              <InfoRow label="Group Name" value={groupData.name} icon={Users} />
              <InfoRow label="Members" value={groupData.memberCount} icon={Users} />
              <InfoRow label="Total Decisions" value={groupData.totalDecisions} icon={FileText} />
              <InfoRow 
                label="Avg Satisfaction" 
                value={`${groupData.avgSatisfaction}/10`} 
                icon={TrendingUp} 
              />
            </div>
          </div>

          {/* Constraints Table */}
          {decisionData.constraints && decisionData.constraints.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Member Constraints</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Member</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Budget</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Dietary</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Satisfied</th>
                    </tr>
                  </thead>
                  <tbody>
                    {decisionData.constraints.map((constraint, index) => (
                      <tr key={index} className="border-t border-slate-100">
                        <td className="px-4 py-3 text-sm text-slate-800 font-medium">
                          {constraint.member}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600">
                          {constraint.budget}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600">
                          {constraint.dietary}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {constraint.satisfied ? (
                            <span className="flex items-center gap-1 text-green-600 font-medium">
                              <CheckCircle className="w-4 h-4" />
                              Yes
                            </span>
                          ) : (
                            <span className="text-red-600 font-medium">No</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Alternatives */}
          {decisionData.alternatives && decisionData.alternatives.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Alternative Options</h3>
              <div className="space-y-3">
                {decisionData.alternatives.map((alt, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                  >
                    <span className="font-medium text-slate-800">{alt.name}</span>
                    <span className="text-slate-600">Score: {alt.score}/10</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PDFExportComponent;
