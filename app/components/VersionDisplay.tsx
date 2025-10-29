'use client';

import { useState, useEffect } from 'react';
import ChangelogModal from './ChangelogModal';

interface BuildInfo {
  version: string;
  gitHash: string;
  gitBranch: string;
  buildDate: string;
  buildDateFormatted: string;
  nodeVersion: string;
  environment: string;
}

export default function VersionDisplay() {
  const [buildInfo, setBuildInfo] = useState<BuildInfo | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showChangelog, setShowChangelog] = useState(false);

  useEffect(() => {
    // Fetch build info from public directory with cache-busting
    const cacheBuster = Date.now();
    fetch(`/build-info.json?t=${cacheBuster}`, {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Loaded build info:', data);
        setBuildInfo(data);
      })
      .catch(error => {
        console.warn('Could not load build info:', error);
        // Fallback build info
        setBuildInfo({
          version: '1.0.0',
          gitHash: 'unknown',
          gitBranch: 'unknown',
          buildDate: new Date().toISOString(),
          buildDateFormatted: new Date().toLocaleDateString('en-US'),
          nodeVersion: 'unknown',
          environment: 'development'
        });
      });
  }, []);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCopyToClipboard = () => {
    if (!buildInfo) return;
    
    const versionText = `Bay Area Aviation Weather Map
Version: ${buildInfo.version}
Build: ${buildInfo.gitHash}
Branch: ${buildInfo.gitBranch}
Built: ${buildInfo.buildDateFormatted}
Environment: ${buildInfo.environment}`;

    navigator.clipboard.writeText(versionText).then(() => {
      // Could add a toast notification here
      console.log('Version info copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy to clipboard:', err);
    });
  };

  if (!buildInfo) {
    return null; // Loading or failed to load
  }

  const showExpanded = isExpanded || isHovered;

  return (
    <div 
      className="fixed bottom-4 right-4 z-[1000] select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`
          bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg
          transition-all duration-300 ease-in-out cursor-pointer
          ${showExpanded ? 'p-3' : 'px-2 py-1'}
        `}
        onClick={handleClick}
        title="Click to expand/collapse version info"
      >
        {/* Minimal version display */}
        <div className="text-xs text-gray-600 font-mono">
          v{buildInfo.version}
        </div>

        {/* Expanded details */}
        {showExpanded && (
          <div className="mt-2 pt-2 border-t border-gray-200 space-y-1">
            <div className="text-xs text-gray-500 font-mono">
              <div>Build: {buildInfo.gitHash}</div>
              <div>Branch: {buildInfo.gitBranch}</div>
              <div>Built: {buildInfo.buildDateFormatted}</div>
              <div>Env: {buildInfo.environment}</div>
            </div>
            
            <div className="flex space-x-3 mt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowChangelog(true);
                }}
                className="text-xs text-green-600 hover:text-green-800 underline"
                title="View changelog and what&apos;s new"
              >
                What&apos;s New
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyToClipboard();
                }}
                className="text-xs text-blue-600 hover:text-blue-800 underline"
                title="Copy version info to clipboard"
              >
                Copy Info
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Changelog Modal */}
      <ChangelogModal
        isOpen={showChangelog}
        onClose={() => setShowChangelog(false)}
        currentVersion={buildInfo.version}
      />
    </div>
  );
}
