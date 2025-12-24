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
          background: linear-gradient(135deg, #011425 0%, #1f4959 50%, #5c7c89 100%);
          min-height: 100vh;
        }
        .container {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        .header {
          background: linear-gradient(135deg, #011425 0%, #1f4959 50%, #5c7c89 100%);
          color: white;
          padding: 40px;
          margin-bottom: 0;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
        }
        .header p {
          margin: 10px 0 0 0;
          opacity: 0.9;
          font-size: 14px;
        }
        .content {
          padding: 40px;
        }
        .section {
          margin-bottom: 30px;
          page-break-inside: avoid;
        }
        .section h2 {
          color: #011425;
          border-bottom: 3px solid #5c7c89;
          padding-bottom: 10px;
          margin-bottom: 15px;
          font-size: 18px;
          font-weight: 700;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 20px;
        }
        .info-item {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          padding: 15px;
          border-radius: 8px;
          border-left: 4px solid #5c7c89;
        }
        .info-label {
          color: #64748b;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 5px;
        }
        .info-value {
          color: #011425;
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
          background: linear-gradient(135deg, #e8f0f7 0%, #dfe9f3 100%);
          font-weight: 600;
          color: #011425;
        }
        .alternative {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          padding: 15px;
          margin: 10px 0;
          border-radius: 8px;
          border-left: 4px solid #5c7c89;
        }
        .footer {
          margin-top: 50px;
          padding: 20px 40px;
          border-top: 2px solid #e2e8f0;
          text-align: center;
          color: #64748b;
          font-size: 12px;
          background: #f8fafc;
        }
        .button-container {
          margin-top: 30px;
          text-align: center;
          padding: 0 40px 40px;
        }
        .button-container button {
          margin-right: 10px;
          margin-bottom: 10px;
        }
        .print-btn {
          background: linear-gradient(135deg, #011425 0%, #1f4959 100%);
          color: white;
          border: none;
          padding: 15px 40px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .print-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(1, 20, 37, 0.2);
        }
        .close-btn {
          background: #e2e8f0;
          color: #475569;
          border: none;
          padding: 15px 40px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .close-btn:hover {
          background: #cbd5e1;
        }
        @media print {
          body { 
            padding: 0;
            background: white;
          }
          .container {
            box-shadow: none;
          }
          .button-container { 
            display: none;
          }
          .no-print { 
            display: none;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📊 Group Decision Report</h1>
          <p>Generated on ${new Date().toLocaleDateString()}</p>
        </div>

        <div class="content">
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
                    <th>Budget Range</th>
                    <th>Preferences</th>
                    <th>Must Haves</th>
                  </tr>
                </thead>
                <tbody>
                  ${decision.constraints.map(c => `
                    <tr>
                      <td><strong>${c.member || 'N/A'}</strong></td>
                      <td>${c.budget || 'N/A'}</td>
                      <td style="font-size: 12px;">${c.preferences || 'N/A'}</td>
                      <td style="font-size: 12px;">${c.mustHaves || 'N/A'}</td>
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
                  <strong style="font-size: 16px; color: #011425;">${alt.name || 'Option'}</strong>
                  <p style="margin: 5px 0 0 0; color: #64748b;">Score: ${alt.score || 0}/10</p>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>

        <div class="footer">
          <p>Generated by Group Decision Resolver</p>
          <p>${new Date().toLocaleString()}</p>
        </div>
      </div>

      <div class="button-container no-print">
        <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
        <button class="close-btn" onclick="window.close()">Close</button>
      </div>
    </body>
    </html>
  `;
  
  printWindow.document.write(htmlContent);
  printWindow.document.close();
};

const ExportButton = ({ onClick, loading, children, variant = 'primary' }) => {
  const baseStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '10px',
    paddingBottom: '10px',
    fontWeight: 'bold',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  };

  const primaryStyles = {
    ...baseStyles,
    background: 'linear-gradient(to bottom right, #14b8a6, #0d9488, #0f766e)',
    color: 'white',
  };

  const secondaryStyles = {
    ...baseStyles,
    background: 'linear-gradient(to bottom right, #fb923c, #f97316, #ea580c)',
    color: 'white',
  };

  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={variant === 'primary' ? primaryStyles : secondaryStyles}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-4px)';
        e.target.style.boxShadow = '0 15px 35px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
      }}
      className={`${loading ? 'opacity-50' : ''}`}
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
          <span>Generating...</span>
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          <span>{children}</span>
        </>
      )}
    </button>
  );
};

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
      <div className="bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 rounded-xl shadow-lg p-8 border-2 border-teal-200 w-full">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Export Report
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', width: '100%', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'flex-start' }}>
          <ExportButton onClick={handleExportPDF} loading={loading}>
            📄 Export as PDF
          </ExportButton>
          <ExportButton onClick={handleExportCSV} variant="secondary">
            📊 Export as CSV
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
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Budget Range</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Preferences</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Must Haves</th>
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
                          {constraint.preferences}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600">
                          {constraint.mustHaves}
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
