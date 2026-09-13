'use client';

import React, { useState, useMemo } from 'react';
import { Calendar, Clock, Heart, Award, CheckCircle, Sparkles } from 'lucide-react';

export function AgeCalculatorTool() {
  const [birthDate, setBirthDate] = useState<string>('2000-01-01');
  const [targetDate, setTargetDate] = useState<string>(new Date().toISOString().slice(0, 10));

  const stats = useMemo(() => {
    const start = new Date(birthDate);
    const end = new Date(targetDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
      return null;
    }

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const diffMs = end.getTime() - start.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const estimatedHeartbeats = Math.floor(totalMinutes * 75); // ~75 bpm
    const estimatedBreaths = Math.floor(totalMinutes * 16); // ~16 bpm

    // Next birthday countdown
    let nextBday = new Date(end.getFullYear(), start.getMonth(), start.getDate());
    if (nextBday < end) {
      nextBday = new Date(end.getFullYear() + 1, start.getMonth(), start.getDate());
    }
    const daysUntilNextBday = Math.ceil((nextBday.getTime() - end.getTime()) / (1000 * 60 * 60 * 24));
    const nextBdayDayOfWeek = nextBday.toLocaleDateString('en-US', { weekday: 'long' });

    // Zodiac
    const m = start.getMonth() + 1;
    const d = start.getDate();
    let zodiac = '';
    if ((m == 1 && d >= 20) || (m == 2 && d <= 18)) zodiac = 'Aquarius ♒';
    else if ((m == 2 && d >= 19) || (m == 3 && d <= 20)) zodiac = 'Pisces ♓';
    else if ((m == 3 && d >= 21) || (m == 4 && d <= 19)) zodiac = 'Aries ♈';
    else if ((m == 4 && d >= 20) || (m == 5 && d <= 20)) zodiac = 'Taurus ♉';
    else if ((m == 5 && d >= 21) || (m == 6 && d <= 20)) zodiac = 'Gemini ♊';
    else if ((m == 6 && d >= 21) || (m == 7 && d <= 22)) zodiac = 'Cancer ♋';
    else if ((m == 7 && d >= 23) || (m == 8 && d <= 22)) zodiac = 'Leo ♌';
    else if ((m == 8 && d >= 23) || (m == 9 && d <= 22)) zodiac = 'Virgo ♍';
    else if ((m == 9 && d >= 23) || (m == 10 && d <= 22)) zodiac = 'Libra ♎';
    else if ((m == 10 && d >= 23) || (m == 11 && d <= 21)) zodiac = 'Scorpio ♏';
    else if ((m == 11 && d >= 22) || (m == 12 && d <= 21)) zodiac = 'Sagittarius ♐';
    else zodiac = 'Capricorn ♑';

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      totalMinutes,
      estimatedHeartbeats,
      estimatedBreaths,
      daysUntilNextBday,
      nextBdayDayOfWeek,
      zodiac,
    };
  }, [birthDate, targetDate]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        <span><strong>Chronological Calculation Engine:</strong> Precise leap year calculation, next birthday forecast, and biological milestones.</span>
      </div>

      {/* Date Pickers Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            Date of Birth
          </label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            Age at the Date of
          </label>
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {stats ? (
        <div className="space-y-6">
          {/* Main Exact Age Banner */}
          <div className="rounded-2xl border border-blue-200 dark:border-blue-900 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/30 p-6 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300 mb-2">
              Exact Age
            </div>
            <div className="flex flex-wrap items-baseline gap-4 font-mono text-2xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400">
              <div>
                <span>{stats.years}</span> <span className="text-xs font-sans text-slate-500">years</span>
              </div>
              <div>
                <span>{stats.months}</span> <span className="text-xs font-sans text-slate-500">months</span>
              </div>
              <div>
                <span>{stats.days}</span> <span className="text-xs font-sans text-slate-500">days</span>
              </div>
            </div>
            <div className="mt-3 text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Western Zodiac Sign: <strong>{stats.zodiac}</strong></span>
            </div>
          </div>

          {/* Next Birthday & Milestones Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Next Birthday */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                <Calendar className="w-4 h-4 text-purple-600" />
                Next Birthday Countdown
              </div>
              <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/40 text-center">
                <div className="font-mono text-3xl font-extrabold text-purple-600 dark:text-purple-400">
                  {stats.daysUntilNextBday} Days
                </div>
                <div className="text-xs text-purple-900 dark:text-purple-300 mt-1">
                  Falling on a <strong>{stats.nextBdayDayOfWeek}</strong>
                </div>
              </div>
            </div>

            {/* Total Milestones */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                <Clock className="w-4 h-4 text-blue-600" />
                Lifetime Milestones
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                  <div className="text-[10px] text-slate-400">Total Months</div>
                  <div className="font-mono font-bold text-slate-800 dark:text-slate-200">{stats.totalMonths.toLocaleString()}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                  <div className="text-[10px] text-slate-400">Total Weeks</div>
                  <div className="font-mono font-bold text-slate-800 dark:text-slate-200">{stats.totalWeeks.toLocaleString()}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                  <div className="text-[10px] text-slate-400">Total Days</div>
                  <div className="font-mono font-bold text-slate-800 dark:text-slate-200">{stats.totalDays.toLocaleString()}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                  <div className="text-[10px] text-slate-400">Total Hours</div>
                  <div className="font-mono font-bold text-slate-800 dark:text-slate-200">{stats.totalHours.toLocaleString()}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 col-span-2 flex items-center justify-between">
                  <span className="text-rose-700 dark:text-rose-300">Estimated Heartbeats</span>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">{stats.estimatedHeartbeats.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-xs text-rose-500 rounded-2xl border border-rose-200 bg-rose-50 dark:bg-rose-950/30">
          Please enter a valid birthdate that occurs before the target date.
        </div>
      )}
    </div>
  );
}
