import React from 'react';
import { Linkedin, Mail, Globe, Code, Heart, Coffee } from 'lucide-react';
import { Button } from './ui/button';

export default function AboutUsTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="h-24 w-24 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4" aria-hidden="true">
              <Code className="h-12 w-12 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            </div>
            <h1 className="text-3xl font-bold mb-2" id="aboutus-title">Equilateral</h1>
            <p className="text-gray-800 dark:text-gray-200 max-w-2xl">
              A comprehensive stock market dashboard for Indian investors, focusing on portfolio management, 
              market trends, and personalized user experience.
            </p>
          </div>
           <div className="bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 p-4 rounded mb-8">
            <p className="font-medium">🚫 This is a proprietary project.</p>
            <p>External contributions are not currently accepted.</p>
            <p>Interested in a partnership or special collaboration? Reach out via Email or LinkedIn below.</p>
          </div>

          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold flex items-center" id="contact-heading">
              <Mail className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Have questions or suggestions? Reach out to our development team.
            </p>
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
              <Button
                variant="outline"
                className="flex items-center"
                aria-label="Email chinmaynkr@gmail.com"
                onClick={() => window.open('mailto:chinmaynkr@gmail.com', '_blank')}
              >
                <Mail className="h-4 w-4 mr-2" />
                chinmaynkr@gmail.com
              </Button>
              <Button
                variant="outline"
                className="flex items-center"
                aria-label="Connect on LinkedIn"
                onClick={() => window.open('https://www.linkedin.com/in/chinmay-nerkar/', '_blank')}
              >
                <Linkedin className="h-4 w-4 mr-2" />
                Connect via LinkedIn
                </Button>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
            <h2 className="text-xl font-semibold mb-4" id="about-project-heading">About the Project</h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Equilateral is designed to provide Indian investors with a comprehensive dashboard for tracking 
                portfolio performance, market trends, and personalized financial insights. The project focuses on 
                creating an intuitive, responsive interface that adapts to different screen sizes and user preferences.
              </p>
              
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
                <h3 className="font-semibold mb-2 text-indigo-700 dark:text-indigo-300" id="key-features-heading">Key Features</h3>
                <ul className="list-disc list-inside space-y-1 text-indigo-800 dark:text-indigo-100" aria-labelledby="key-features-heading">
                  <li>Responsive dashboard with real-time data visualization</li>
                  <li>Portfolio tracking with performance metrics</li>
                  <li>Watchlist management for stocks of interest</li>
                  <li>Personalized user profiles with financial summaries</li>
                  <li>Indian market-focused data and insights</li>
                  <li>Dark/light theme support for comfortable viewing</li>
                </ul>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
                <h3 className="font-semibold mb-2 text-amber-700 dark:text-amber-300" id="tech-used-heading">Technologies Used</h3>
                <ul className="list-disc list-inside space-y-1 text-amber-800 dark:text-amber-100" aria-labelledby="tech-used-heading">
                  <li>React with TypeScript for type-safe development</li>
                  <li>Tailwind CSS for responsive styling</li>
                  <li>Recharts for data visualization</li>
                  <li>Lucide React for consistent iconography</li>
                  <li>Next Themes for theme management</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-4 flex items-center justify-center border-t border-gray-200 dark:border-gray-700 mt-10">
          <p className="text-sm text-gray-800 dark:text-gray-200 flex items-center">
            Made with <Heart className="h-4 w-4 text-red-500 mx-1" aria-hidden="true" /> by Equilateral Team
          </p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden transition-shadow duration-300 hover:shadow-2xl mt-10">
        <div className="p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center" id="disclaimer-heading">
            <Globe className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
            Disclaimer
          </h2>
          <div className="text-sm text-gray-800 dark:text-gray-200 space-y-2" aria-labelledby="disclaimer-heading">
            <p>
              This dashboard is for demonstration purposes only. The data presented is simulated and does not represent 
              actual market conditions or real investment accounts.
            </p>
            <p>
              Equilateral is not a registered investment advisor and does not provide financial advice. 
              Always consult with a qualified financial professional before making investment decisions.
            </p>
            <p>
              &copy; 2025 Equilateral. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
