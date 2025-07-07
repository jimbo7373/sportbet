'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Poisson probability mass function
function poissonPMF(k: number, lambda: number): number {
  if (k < 0) return 0;
  let result = Math.exp(-lambda);
  for (let i = 1; i <= k; i++) {
    result = result * lambda / i;
  }
  return result;
}

// Poisson cumulative distribution function
function poissonCDF(k: number, lambda: number): number {
  let sum = 0;
  for (let i = 0; i <= Math.floor(k); i++) {
    sum += poissonPMF(i, lambda);
  }
  return sum;
}

// Calculate expected goals (xG)
function calculateXG(teamAvgGoals: number, oppAvgConceded: number, adjustment: number = 1.0): number {
  return (teamAvgGoals + oppAvgConceded) / 2 * adjustment;
}

// Predict probabilities using Poisson distribution
function predictProbabilities(team1XG: number, team2XG: number, threshold: number): [number, number] {
  const totalXG = team1XG + team2XG;
  const overProb = 1 - poissonCDF(threshold - 0.5, totalXG);
  const underProb = poissonCDF(threshold + 0.5, totalXG);
  return [overProb, underProb];
}

// Calculate value bet
function calculateValue(predProb: number, odds: number): number {
  return (predProb * odds) - 1;
}

interface MatchData {
  teamA: string;
  teamB: string;
  matchDate: string;
  teamAAvgGoalsHome: number;
  teamAAvgConcededHome: number;
  teamBAvgGoalsAway: number;
  teamBAvgConcededAway: number;
  teamAAvgGoalsHTHome: number;
  teamAAvgConcededHTHome: number;
  teamBAvgGoalsHTAway: number;
  teamBAvgConcededHTAway: number;
  teamAAvgGoals2HHome: number;
  teamAAvgConceded2HHome: number;
  teamBAvgGoals2HAway: number;
  teamBAvgConceded2HAway: number;
  oddsOver25: number;
  oddsUnder25: number;
  oddsOver15HT: number;
  oddsUnder15HT: number;
  oddsOver152H: number;
  oddsUnder152H: number;
  injuryAdjustmentTeamA: number;
  injuryAdjustmentTeamB: number;
}

interface BettingResults {
  teamAXG: number;
  teamBXG: number;
  over25Prob: number;
  under25Prob: number;
  over15HTProb: number;
  under15HTProb: number;
  over152HProb: number;
  under152HProb: number;
  over25Value: number;
  under25Value: number;
  over15HTValue: number;
  under15HTValue: number;
  over152HValue: number;
  under152HValue: number;
  fullRecommended: string;
  htRecommended: string;
  shRecommended: string;
}

export default function PlayToWinPage() {
  const [matchData, setMatchData] = useState<MatchData>({
    teamA: '',
    teamB: '',
    matchDate: '',
    teamAAvgGoalsHome: 2.0,
    teamAAvgConcededHome: 1.0,
    teamBAvgGoalsAway: 1.5,
    teamBAvgConcededAway: 1.2,
    teamAAvgGoalsHTHome: 0.9,
    teamAAvgConcededHTHome: 0.4,
    teamBAvgGoalsHTAway: 0.6,
    teamBAvgConcededHTAway: 0.5,
    teamAAvgGoals2HHome: 1.1,
    teamAAvgConceded2HHome: 0.6,
    teamBAvgGoals2HAway: 0.9,
    teamBAvgConceded2HAway: 0.7,
    oddsOver25: 2.30,
    oddsUnder25: 1.70,
    oddsOver15HT: 2.10,
    oddsUnder15HT: 1.80,
    oddsOver152H: 1.95,
    oddsUnder152H: 1.85,
    injuryAdjustmentTeamA: 1.0,
    injuryAdjustmentTeamB: 1.0
  });

  const [results, setResults] = useState<BettingResults | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (field: keyof MatchData, value: string | number) => {
    setMatchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const analyzeMatch = () => {
    // Full match xG
    const teamAXG = calculateXG(
      matchData.teamAAvgGoalsHome,
      matchData.teamBAvgConcededAway,
      matchData.injuryAdjustmentTeamA
    );
    const teamBXG = calculateXG(
      matchData.teamBAvgGoalsAway,
      matchData.teamAAvgConcededHome,
      matchData.injuryAdjustmentTeamB
    );

    // First half xG
    const teamAXGHT = calculateXG(
      matchData.teamAAvgGoalsHTHome,
      matchData.teamBAvgConcededHTAway,
      matchData.injuryAdjustmentTeamA
    );
    const teamBXGHT = calculateXG(
      matchData.teamBAvgGoalsHTAway,
      matchData.teamAAvgConcededHTHome,
      matchData.injuryAdjustmentTeamB
    );

    // Second half xG
    const teamAXG2H = calculateXG(
      matchData.teamAAvgGoals2HHome,
      matchData.teamBAvgConceded2HAway,
      matchData.injuryAdjustmentTeamA
    );
    const teamBXG2H = calculateXG(
      matchData.teamBAvgGoals2HAway,
      matchData.teamAAvgConceded2HHome,
      matchData.injuryAdjustmentTeamB
    );

    // Calculate probabilities
    const [over25Prob, under25Prob] = predictProbabilities(teamAXG, teamBXG, 2.5);
    const [over15HTProb, under15HTProb] = predictProbabilities(teamAXGHT, teamBXGHT, 1.5);
    const [over152HProb, under152HProb] = predictProbabilities(teamAXG2H, teamBXG2H, 1.5);

    // Calculate values
    const over25Value = calculateValue(over25Prob, matchData.oddsOver25);
    const under25Value = calculateValue(under25Prob, matchData.oddsUnder25);
    const over15HTValue = calculateValue(over15HTProb, matchData.oddsOver15HT);
    const under15HTValue = calculateValue(under15HTProb, matchData.oddsUnder15HT);
    const over152HValue = calculateValue(over152HProb, matchData.oddsOver152H);
    const under152HValue = calculateValue(under152HProb, matchData.oddsUnder152H);

    // Determine recommendations
    const fullRecommended = (over25Value > under25Value && over25Value > 0) ? "Over 2.5" : "Under 2.5";
    const htRecommended = (over15HTValue > under15HTValue && over15HTValue > 0) ? "Over 1.5 HT" : "Under 1.5 HT";
    const shRecommended = (over152HValue > under152HValue && over152HValue > 0) ? "Over 1.5 2H" : "Under 1.5 2H";

    setResults({
      teamAXG,
      teamBXG,
      over25Prob,
      under25Prob,
      over15HTProb,
      under15HTProb,
      over152HProb,
      under152HProb,
      over25Value,
      under25Value,
      over15HTValue,
      under15HTValue,
      over152HValue,
      under152HValue,
      fullRecommended,
      htRecommended,
      shRecommended
    });
  };

  return (
    <main className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <img 
              src="/logo.png" 
              alt="Jim's Sportbets Logo" 
              className="h-20 w-auto"
            />
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white">Play To Win</h2>
            <Link
              href="/admin"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Admin
            </Link>
          </div>
          <p className="mt-2 text-gray-300">
            Welcome to the Play To Win section
          </p>
        </div>

        {/* Betting Analysis Tool */}
        <div className="bg-gray-800 rounded-lg shadow p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              ⚽ Betting Analysis Tool
            </h3>
            <p className="text-gray-300 mb-6">
              Advanced football betting predictions using Poisson distribution and xG analysis
            </p>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              {showForm ? 'Hide Analysis Form' : 'Start Analysis'}
            </button>
          </div>

          {showForm && (
            <div className="space-y-6">
              {/* Basic Match Info */}
              <div className="bg-gray-700 rounded-lg p-6">
                <h4 className="text-lg font-medium text-white mb-4">Match Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Team A (Home)</label>
                    <input
                      type="text"
                      value={matchData.teamA}
                      onChange={(e) => handleInputChange('teamA', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400"
                      placeholder="Enter Team A"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Team B (Away)</label>
                    <input
                      type="text"
                      value={matchData.teamB}
                      onChange={(e) => handleInputChange('teamB', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white placeholder-gray-400"
                      placeholder="Enter Team B"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Match Date</label>
                    <input
                      type="date"
                      value={matchData.matchDate}
                      onChange={(e) => handleInputChange('matchDate', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Team Statistics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Team A Stats */}
                <div className="bg-gray-700 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-white mb-4">Team A (Home) Statistics</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Avg Goals (Home)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={matchData.teamAAvgGoalsHome}
                          onChange={(e) => handleInputChange('teamAAvgGoalsHome', parseFloat(e.target.value))}
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Avg Conceded (Home)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={matchData.teamAAvgConcededHome}
                          onChange={(e) => handleInputChange('teamAAvgConcededHome', parseFloat(e.target.value))}
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Avg Goals HT (Home)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={matchData.teamAAvgGoalsHTHome}
                          onChange={(e) => handleInputChange('teamAAvgGoalsHTHome', parseFloat(e.target.value))}
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Avg Conceded HT (Home)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={matchData.teamAAvgConcededHTHome}
                          onChange={(e) => handleInputChange('teamAAvgConcededHTHome', parseFloat(e.target.value))}
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Avg Goals 2H (Home)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={matchData.teamAAvgGoals2HHome}
                          onChange={(e) => handleInputChange('teamAAvgGoals2HHome', parseFloat(e.target.value))}
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Avg Conceded 2H (Home)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={matchData.teamAAvgConceded2HHome}
                          onChange={(e) => handleInputChange('teamAAvgConceded2HHome', parseFloat(e.target.value))}
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Injury Adjustment</label>
                      <input
                        type="number"
                        step="0.1"
                        value={matchData.injuryAdjustmentTeamA}
                        onChange={(e) => handleInputChange('injuryAdjustmentTeamA', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Team B Stats */}
                <div className="bg-gray-700 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-white mb-4">Team B (Away) Statistics</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Avg Goals (Away)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={matchData.teamBAvgGoalsAway}
                          onChange={(e) => handleInputChange('teamBAvgGoalsAway', parseFloat(e.target.value))}
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Avg Conceded (Away)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={matchData.teamBAvgConcededAway}
                          onChange={(e) => handleInputChange('teamBAvgConcededAway', parseFloat(e.target.value))}
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Avg Goals HT (Away)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={matchData.teamBAvgGoalsHTAway}
                          onChange={(e) => handleInputChange('teamBAvgGoalsHTAway', parseFloat(e.target.value))}
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Avg Conceded HT (Away)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={matchData.teamBAvgConcededHTAway}
                          onChange={(e) => handleInputChange('teamBAvgConcededHTAway', parseFloat(e.target.value))}
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Avg Goals 2H (Away)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={matchData.teamBAvgGoals2HAway}
                          onChange={(e) => handleInputChange('teamBAvgGoals2HAway', parseFloat(e.target.value))}
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Avg Conceded 2H (Away)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={matchData.teamBAvgConceded2HAway}
                          onChange={(e) => handleInputChange('teamBAvgConceded2HAway', parseFloat(e.target.value))}
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Injury Adjustment</label>
                      <input
                        type="number"
                        step="0.1"
                        value={matchData.injuryAdjustmentTeamB}
                        onChange={(e) => handleInputChange('injuryAdjustmentTeamB', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Odds */}
              <div className="bg-gray-700 rounded-lg p-6">
                <h4 className="text-lg font-medium text-white mb-4">Bookmaker Odds</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Over 2.5</label>
                    <input
                      type="number"
                      step="0.01"
                      value={matchData.oddsOver25}
                      onChange={(e) => handleInputChange('oddsOver25', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Under 2.5</label>
                    <input
                      type="number"
                      step="0.01"
                      value={matchData.oddsUnder25}
                      onChange={(e) => handleInputChange('oddsUnder25', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Over 1.5 HT</label>
                    <input
                      type="number"
                      step="0.01"
                      value={matchData.oddsOver15HT}
                      onChange={(e) => handleInputChange('oddsOver15HT', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Under 1.5 HT</label>
                    <input
                      type="number"
                      step="0.01"
                      value={matchData.oddsUnder15HT}
                      onChange={(e) => handleInputChange('oddsUnder15HT', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Over 1.5 2H</label>
                    <input
                      type="number"
                      step="0.01"
                      value={matchData.oddsOver152H}
                      onChange={(e) => handleInputChange('oddsOver152H', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Under 1.5 2H</label>
                    <input
                      type="number"
                      step="0.01"
                      value={matchData.oddsUnder152H}
                      onChange={(e) => handleInputChange('oddsUnder152H', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Analyze Button */}
              <div className="text-center">
                <button
                  onClick={analyzeMatch}
                  disabled={!matchData.teamA || !matchData.teamB}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                  Analyze Match
                </button>
              </div>
            </div>
          )}

          {/* Results */}
          {results && (
            <div className="mt-8 space-y-6">
              <div className="bg-gray-700 rounded-lg p-6">
                <h4 className="text-lg font-medium text-white mb-4">📊 Analysis Results</h4>
                
                {/* Match Header */}
                <div className="text-center mb-6">
                  <h5 className="text-xl font-bold text-white">
                    {matchData.teamA} vs {matchData.teamB}
                  </h5>
                  <p className="text-gray-300">{matchData.matchDate}</p>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-gray-600 rounded-lg p-4">
                      <p className="text-sm text-gray-300">Expected Goals (xG)</p>
                      <p className="text-2xl font-bold text-blue-400">{results.teamAXG.toFixed(2)}</p>
                      <p className="text-sm text-gray-300">{matchData.teamA}</p>
                    </div>
                    <div className="bg-gray-600 rounded-lg p-4">
                      <p className="text-sm text-gray-300">Expected Goals (xG)</p>
                      <p className="text-2xl font-bold text-red-400">{results.teamBXG.toFixed(2)}</p>
                      <p className="text-sm text-gray-300">{matchData.teamB}</p>
                    </div>
                  </div>
                </div>

                {/* Predictions Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left py-3 px-4 text-gray-300">Market</th>
                        <th className="text-left py-3 px-4 text-gray-300">Probabilities</th>
                        <th className="text-left py-3 px-4 text-gray-300">Value</th>
                        <th className="text-left py-3 px-4 text-gray-300">Recommendation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-600">
                      <tr>
                        <td className="py-3 px-4 text-white font-medium">Over/Under 2.5</td>
                        <td className="py-3 px-4 text-gray-300">
                          Over: {(results.over25Prob * 100).toFixed(1)}%<br/>
                          Under: {(results.under25Prob * 100).toFixed(1)}%
                        </td>
                        <td className="py-3 px-4">
                          <span className={`font-medium ${Math.max(results.over25Value, results.under25Value) > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {Math.max(results.over25Value, results.under25Value).toFixed(2)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            results.fullRecommended.includes('Over') ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                          }`}>
                            {results.fullRecommended}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-white font-medium">Over/Under 1.5 HT</td>
                        <td className="py-3 px-4 text-gray-300">
                          Over: {(results.over15HTProb * 100).toFixed(1)}%<br/>
                          Under: {(results.under15HTProb * 100).toFixed(1)}%
                        </td>
                        <td className="py-3 px-4">
                          <span className={`font-medium ${Math.max(results.over15HTValue, results.under15HTValue) > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {Math.max(results.over15HTValue, results.under15HTValue).toFixed(2)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            results.htRecommended.includes('Over') ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                          }`}>
                            {results.htRecommended}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-white font-medium">Over/Under 1.5 2H</td>
                        <td className="py-3 px-4 text-gray-300">
                          Over: {(results.over152HProb * 100).toFixed(1)}%<br/>
                          Under: {(results.under152HProb * 100).toFixed(1)}%
                        </td>
                        <td className="py-3 px-4">
                          <span className={`font-medium ${Math.max(results.over152HValue, results.under152HValue) > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {Math.max(results.over152HValue, results.under152HValue).toFixed(2)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            results.shRecommended.includes('Over') ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                          }`}>
                            {results.shRecommended}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Value Explanation */}
                <div className="mt-6 p-4 bg-gray-600 rounded-lg">
                  <p className="text-sm text-gray-300">
                    <strong>Value Betting:</strong> Positive values indicate potentially profitable bets. 
                    Values greater than 0.10 (10%) are generally considered good betting opportunities.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 