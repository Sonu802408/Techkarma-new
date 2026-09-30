import React from 'react';
import { ArrowRight, Briefcase, Library, PenTool, Beaker, Atom, FlaskConical, GraduationCap, BookOpen } from 'lucide-react';

export const getClassCardMeta = (cls) => {
    switch (cls) {
        case 6:
            return {
                num: "06",
                stage: "Middle School",
                focusTag: "Foundation & Logic",
                description: "Core conceptual foundation in Mathematics, Science, and Languages with structured early problem solving.",
                subjectsSnippet: "6 Subjects • NCERT Notes",
                accent: "#3b82f6",
                accentRgb: "59, 130, 246",
                icon: <Briefcase size={22} />
            };
        case 7:
            return {
                num: "07",
                stage: "Middle School",
                focusTag: "Analytical Skills",
                description: "Deepening analytical skills, core science principles, and structured mathematical reasoning.",
                subjectsSnippet: "6 Subjects • Chapter Notes",
                accent: "#10b981",
                accentRgb: "16, 185, 129",
                icon: <Library size={22} />
            };
        case 8:
            return {
                num: "08",
                stage: "Middle School",
                focusTag: "Advanced Foundation",
                description: "Bridging middle-school concepts to prepare for high-school rigor and STEM excellence.",
                subjectsSnippet: "6 Subjects • Revision Sheets",
                accent: "#f59e0b",
                accentRgb: "245, 158, 11",
                icon: <PenTool size={22} />
            };
        case 9:
            return {
                num: "09",
                stage: "Secondary",
                focusTag: "Pre-Board Mastery",
                description: "Comprehensive CBSE curriculum building deep conceptual clarity and high school board readiness.",
                subjectsSnippet: "6 Subjects • Formulas & Tests",
                accent: "#ec4899",
                accentRgb: "236, 72, 153",
                icon: <Beaker size={22} />
            };
        case 10:
            return {
                num: "10",
                stage: "Secondary",
                focusTag: "Board Exam Excellence",
                description: "Complete CBSE 10th Board preparation with chapter notes, NCERT exemplar, and mock test series.",
                subjectsSnippet: "6 Subjects • Board Test Series",
                accent: "#8b5cf6",
                accentRgb: "139, 92, 246",
                icon: <Atom size={22} />
            };
        case 11:
            return {
                num: "11",
                stage: "Senior Secondary",
                focusTag: "Stream Specialization",
                description: "Specialized Science (PCM/PCB), Commerce, and Arts streams with deep board & competitive focus.",
                subjectsSnippet: "Science • Commerce • Arts",
                accent: "#0ea5e9",
                accentRgb: "14, 165, 233",
                icon: <FlaskConical size={22} />
            };
        case 12:
            return {
                num: "12",
                stage: "Senior Secondary",
                focusTag: "Board & Career Mastery",
                description: "Rigorous 12th Board scoring strategies, past 10-year question banks, and competitive entrance edge.",
                subjectsSnippet: "Board Prep • 3 Streams",
                accent: "#f97316",
                accentRgb: "249, 115, 22",
                icon: <GraduationCap size={22} />
            };
        default:
            return {
                num: `${cls}`,
                stage: "Academic",
                focusTag: "CBSE Curriculum",
                description: "Comprehensive study materials, notes, and chapter-wise tests.",
                subjectsSnippet: "Core Subjects",
                accent: "#3b82f6",
                accentRgb: "59, 130, 246",
                icon: <BookOpen size={22} />
            };
    }
};

const ClassCard = ({ cls, index = 0, onClick }) => {
    const meta = getClassCardMeta(cls);

    return (
        <div
            onClick={onClick}
            className="edtech-class-card animate-fade-in"
            style={{
                '--class-accent': meta.accent,
                '--class-accent-rgb': meta.accentRgb,
                animationDelay: `${index * 0.06}s`,
                cursor: 'pointer'
            }}
        >
            <div className="card-top-row">
                <div className="class-icon-badge">
                    {meta.icon}
                </div>
                <span className="class-stage-pill">{meta.stage}</span>
            </div>

            <div className="card-main-info">
                <div className="class-num-watermark">{meta.num}</div>
                <div className="class-meta-header">
                    <span className="class-kicker-tag">{meta.focusTag}</span>
                    <h3 className="class-title-text">Class {cls}</h3>
                </div>
            </div>

            <p className="class-card-desc">
                {meta.description}
            </p>

            <div className="class-card-footer">
                <span className="class-subjects-tag">{meta.subjectsSnippet}</span>
                <div className="class-card-cta">
                    <span>Explore</span>
                    <ArrowRight size={15} className="cta-arrow" />
                </div>
            </div>
        </div>
    );
};

export default ClassCard;
