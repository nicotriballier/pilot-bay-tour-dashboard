'use client';

import { useState } from 'react';
import { CHANGELOG } from '../data/changelog';

interface ChangelogModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentVersion: string;
}

export default function ChangelogModal({ isOpen, onClose, currentVersion }: ChangelogModalProps) {
  const [selectedVersion, setSelectedVersion] = useState(currentVersion);

  if (!isOpen) return null;

  const selectedChangelog = CHANGELOG.find(entry => entry.version === selectedVersion);

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl max-h-[80vh] w-full mx-4 flex flex-col">
        {/* Header - Full Width */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">📋 Changelog</h2>
              <div className="text-sm text-gray-500 mt-1">Bay Area Aviation Weather Map</div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              title="Close changelog"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content Area - Versions Left, Details Right */}
        <div className="flex flex-1 min-h-0">
          {/* Version Sidebar - Left */}
          <div className="w-48 border-r border-gray-200 bg-gray-50">
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Versions</h3>
              <div className="space-y-1">
                {CHANGELOG.map((entry) => (
                  <button
                    key={entry.version}
                    onClick={() => setSelectedVersion(entry.version)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedVersion === entry.version
                        ? 'bg-blue-100 text-blue-900 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-mono">v{entry.version}</div>
                    <div className="text-xs text-gray-500">{entry.date}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area - Right */}
          <div className="flex-1 overflow-y-auto">
            {selectedChangelog && (
              <div className="p-6">
                {/* Version Header */}
                <div className="mb-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-3xl font-bold text-gray-900">
                      v{selectedChangelog.version}
                    </h3>
                    {selectedChangelog.version === currentVersion && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="text-gray-600 mb-3">{selectedChangelog.date}</div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">
                    {selectedChangelog.title}
                  </h4>
                  
                  {/* Highlights */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <h5 className="font-semibold text-blue-900 mb-2">✨ Key Highlights</h5>
                    <ul className="space-y-1">
                      {selectedChangelog.highlights.map((highlight, index) => (
                        <li key={index} className="text-blue-800 text-sm flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Sections */}
                <div className="space-y-6">
                  {selectedChangelog.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <h5 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="mr-2">{section.emoji}</span>
                        {section.title}
                      </h5>
                      <ul className="space-y-2 ml-6">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-gray-700 text-sm flex items-start">
                            <span className="text-gray-400 mr-3 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Safety Notice for Aviation */}
                {selectedChangelog.version === currentVersion && (
                  <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start">
                      <span className="text-amber-600 mr-2">⚠️</span>
                      <div>
                        <h6 className="font-semibold text-amber-800 mb-1">Aviation Safety Notice</h6>
                        <p className="text-amber-700 text-sm">
                          This application provides supplementary weather information for aviation purposes. 
                          Always consult official weather sources and follow proper flight planning procedures.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
