
-- Users and Auth
CREATE TABLE users (
    id CHAR(36) PRIMARY KEY, -- UUIDs stored as strings
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role ENUM('Participant', 'Organizer', 'Sponsor', 'Recruiter', 'Mentor', 'Admin') NOT NULL,
    university VARCHAR(255),
    skills JSON, -- JSON array of strings
    avatar TEXT,
    bio TEXT,
    github TEXT,
    linkedin TEXT,
    portfolio TEXT,
    profile_visibility ENUM('public', 'recruiters-only', 'private') DEFAULT 'public',
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- User Statistics
CREATE TABLE user_stats (
    user_id CHAR(36) PRIMARY KEY,
    `rank` INTEGER DEFAULT 0, -- rank is a reserved keyword in MySQL, needs backticks
    points INTEGER DEFAULT 0,
    events_won INTEGER DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Institutions
CREATE TABLE institutions (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo TEXT,
    `rank` INTEGER,
    total_points INTEGER DEFAULT 0,
    location TEXT,
    verified BOOLEAN DEFAULT FALSE
);

-- Events
CREATE TABLE events (
    id CHAR(36) PRIMARY KEY,
    organizer_id CHAR(36),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category ENUM('Hackathon', 'Coding', 'Debate', 'Robotics', 'Gaming', 'Design', 'Seminar', 'AI/ML'),
    mode ENUM('Offline', 'Online'),
    status ENUM('Upcoming', 'Live', 'Ended'),
    date_display VARCHAR(255),
    start_date DATETIME,
    venue TEXT,
    max_participants INTEGER,
    participants_count INTEGER DEFAULT 0,
    image TEXT,
    prizes JSON, -- JSON Array
    rules TEXT,
    schedule TEXT,
    registration_deadline DATETIME,
    difficulty ENUM('Beginner', 'Intermediate', 'Advanced'),
    tags JSON, -- JSON Array
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES users(id)
);

-- Teams
CREATE TABLE teams (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    leader_id CHAR(36),
    competition_id CHAR(36),
    max_members INTEGER DEFAULT 4,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (leader_id) REFERENCES users(id),
    FOREIGN KEY (competition_id) REFERENCES events(id)
);

-- Team Members (Junction)
CREATE TABLE team_members (
    team_id CHAR(36),
    user_id CHAR(36),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (team_id, user_id),
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Event Registrations
CREATE TABLE event_registrations (
    id CHAR(36) PRIMARY KEY,
    event_id CHAR(36),
    user_id CHAR(36),
    team_id CHAR(36),
    status ENUM('pending', 'confirmed', 'rejected', 'waitlisted', 'checked-in', 'approved'),
    payment_status ENUM('pending', 'completed', 'failed'),
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (team_id) REFERENCES teams(id)
);

-- Sponsorship Profiles
CREATE TABLE sponsor_profiles (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36),
    company_name VARCHAR(255) NOT NULL,
    logo TEXT,
    industry VARCHAR(255),
    description TEXT,
    website TEXT,
    email VARCHAR(255),
    location TEXT,
    sponsorship_categories JSON, -- JSON Array
    verified BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Sponsorship Roles (Offered by Sponsors)
CREATE TABLE sponsorship_roles (
    id CHAR(36) PRIMARY KEY,
    sponsor_id CHAR(36),
    title VARCHAR(255) NOT NULL,
    category JSON,
    min_event_level VARCHAR(50),
    offerings JSON,
    benefits JSON,
    budget_min INTEGER,
    budget_max INTEGER,
    status VARCHAR(20) DEFAULT 'Open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sponsor_id) REFERENCES sponsor_profiles(id)
);

-- Sponsorship Opportunities (Requested by Organizers)
CREATE TABLE sponsorship_opportunities (
    id CHAR(36) PRIMARY KEY,
    event_id CHAR(36),
    title VARCHAR(255),
    budget_amount DECIMAL(10, 2),
    description TEXT,
    min_reach INTEGER,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id)
);

-- Sponsorship Applications (Deals)
CREATE TABLE sponsorship_applications (
    id CHAR(36) PRIMARY KEY,
    event_id CHAR(36),
    sponsor_id CHAR(36),
    sponsorship_role_id CHAR(36),
    status ENUM('draft', 'submitted', 'under-review', 'accepted', 'rejected', 'negotiating', 'completed'),
    proposed_value TEXT,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id),
    FOREIGN KEY (sponsor_id) REFERENCES sponsor_profiles(id),
    FOREIGN KEY (sponsorship_role_id) REFERENCES sponsorship_roles(id)
);

-- Mentorship Profiles
CREATE TABLE mentor_profiles (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36),
    title VARCHAR(255),
    organization VARCHAR(255),
    hourly_rate DECIMAL(10, 2),
    currency VARCHAR(10) DEFAULT 'USD',
    expertise JSON,
    availability JSON, -- JSON Object
    review_count INTEGER DEFAULT 0,
    rating DECIMAL(3, 2) DEFAULT 0.0,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Mentorship Requests
CREATE TABLE mentorship_requests (
    id CHAR(36) PRIMARY KEY,
    mentor_id CHAR(36),
    mentee_id CHAR(36),
    message TEXT,
    status ENUM('pending', 'accepted', 'rejected', 'completed', 'cancelled'),
    proposed_slots JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (mentor_id) REFERENCES mentor_profiles(id),
    FOREIGN KEY (mentee_id) REFERENCES users(id)
);

-- Mentorship Sessions
CREATE TABLE mentorship_sessions (
    id CHAR(36) PRIMARY KEY,
    request_id CHAR(36),
    mentor_id CHAR(36),
    mentee_id CHAR(36),
    start_time DATETIME,
    duration_minutes INTEGER,
    meet_link TEXT,
    status ENUM('scheduled', 'live', 'completed', 'cancelled'),
    notes TEXT,
    FOREIGN KEY (request_id) REFERENCES mentorship_requests(id),
    FOREIGN KEY (mentor_id) REFERENCES mentor_profiles(id),
    FOREIGN KEY (mentee_id) REFERENCES users(id)
);

-- Recruitment: Job Postings
CREATE TABLE job_postings (
    id CHAR(36) PRIMARY KEY,
    recruiter_id CHAR(36),
    company_name VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    requirements JSON,
    skills JSON,
    location TEXT,
    type ENUM('full-time', 'part-time', 'internship', 'contract'),
    salary_range VARCHAR(100),
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deadline DATETIME,
    FOREIGN KEY (recruiter_id) REFERENCES users(id)
);

-- Recruitment: Shortlists
CREATE TABLE shortlists (
    id CHAR(36) PRIMARY KEY,
    recruiter_id CHAR(36),
    candidate_id CHAR(36),
    job_id CHAR(36),
    status ENUM('interested', 'contacted', 'interviewing', 'offered', 'hired', 'rejected'),
    notes TEXT,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recruiter_id) REFERENCES users(id),
    FOREIGN KEY (candidate_id) REFERENCES users(id),
    FOREIGN KEY (job_id) REFERENCES job_postings(id)
);

-- Messaging
CREATE TABLE chat_messages (
    id CHAR(36) PRIMARY KEY,
    sender_id CHAR(36),
    recipient_id CHAR(36),
    team_id CHAR(36),
    content TEXT NOT NULL,
    channel ENUM('Global', 'Team', 'Direct'),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (recipient_id) REFERENCES users(id),
    FOREIGN KEY (team_id) REFERENCES teams(id)
);

-- Announcements
CREATE TABLE announcements (
    id CHAR(36) PRIMARY KEY,
    event_id CHAR(36),
    organizer_id CHAR(36),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    priority ENUM('low', 'medium', 'high', 'urgent'),
    target_audience ENUM('all', 'participants', 'sponsors', 'team-leaders'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id),
    FOREIGN KEY (organizer_id) REFERENCES users(id)
);
