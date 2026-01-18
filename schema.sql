create DATABASE IF NOT EXISTS competex_db;
USE competex_db;
-- Users and Auth
CREATE TABLE IF NOT EXISTS users (
    id CHAR(36) PRIMARY KEY, -- UUIDs stored as strings
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
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
CREATE TABLE IF NOT EXISTS user_stats (
    user_id CHAR(36) PRIMARY KEY,
    `rank` INTEGER DEFAULT 0, -- rank is a reserved keyword in MySQL, needs backticks
    points INTEGER DEFAULT 0,
    events_won INTEGER DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Institutions
CREATE TABLE IF NOT EXISTS institutions (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo TEXT,
    `rank` INTEGER,
    total_points INTEGER DEFAULT 0,
    location TEXT,
    verified BOOLEAN DEFAULT FALSE
);

-- Events
CREATE TABLE IF NOT EXISTS events (
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
CREATE TABLE IF NOT EXISTS teams (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    leader_id CHAR(36),
    competition_id CHAR(36),
    max_members INTEGER DEFAULT 4,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (leader_id) REFERENCES users(id),
    FOREIGN KEY (competition_id) REFERENCES events(id)
);
-- USERS
CREATE TABLE IF NOT EXISTS users (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role ENUM('Participant','Organizer','Sponsor','Recruiter','Mentor','Admin') NOT NULL,
    university VARCHAR(255),
    bio TEXT,
    github TEXT,
    linkedin TEXT,
    portfolio TEXT,
    profile_visibility ENUM('public','recruiters-only','private') DEFAULT 'public',
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- USER STATS (BCNF)
CREATE TABLE IF NOT EXISTS user_stats (
    user_id CHAR(36) PRIMARY KEY,
    points INT DEFAULT 0,
    events_won INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- INSTITUTIONS
CREATE TABLE IF NOT EXISTS institutions (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo TEXT,
    rank INT,
    total_points INT DEFAULT 0,
    location TEXT,
    verified BOOLEAN DEFAULT FALSE
);

-- EVENTS
CREATE TABLE IF NOT EXISTS events (
    id CHAR(36) PRIMARY KEY,
    organizer_id CHAR(36),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    mode ENUM('Online','Offline'),
    status ENUM('Upcoming','Live','Ended') DEFAULT 'Upcoming',
    start_date DATETIME,
    registration_deadline DATETIME,
    venue TEXT,
    max_participants INT,
    participants_count INT DEFAULT 0,
    difficulty ENUM('Beginner','Intermediate','Advanced'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES users(id)
);

-- TEAMS
CREATE TABLE IF NOT EXISTS teams (
    id CHAR(36) PRIMARY KEY,
    event_id CHAR(36),
    leader_id CHAR(36),
    name VARCHAR(255) NOT NULL,
    max_members INT DEFAULT 4,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id),
    FOREIGN KEY (leader_id) REFERENCES users(id)
);

-- TEAM MEMBERS (M:N)
CREATE TABLE IF NOT EXISTS team_members (
    team_id CHAR(36),
    user_id CHAR(36),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (team_id, user_id),
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- EVENT REGISTRATIONS
CREATE TABLE IF NOT EXISTS event_registrations (
    id CHAR(36) PRIMARY KEY,
    event_id CHAR(36),
    user_id CHAR(36),
    team_id CHAR(36),
    status ENUM('pending','approved','rejected','checked-in'),
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (team_id) REFERENCES teams(id)
);

-- MEDIA (PROFILE PICTURES & EVENT POSTERS)
CREATE TABLE IF NOT EXISTS media (
    media_id CHAR(36) PRIMARY KEY,
    owner_type ENUM('User','Event') NOT NULL,
    owner_id CHAR(36) NOT NULL,
    media_type ENUM('Profile','Poster','Gallery','Certificate') NOT NULL,
    file_path TEXT NOT NULL,
    mime_type VARCHAR(50),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SPONSORSHIP PROFILES
CREATE TABLE IF NOT EXISTS sponsor_profiles (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36),
    company_name VARCHAR(255),
    industry VARCHAR(255),
    description TEXT,
    website TEXT,
    verified BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- SPONSORSHIP ROLES
CREATE TABLE IF NOT EXISTS sponsorship_roles (
    id CHAR(36) PRIMARY KEY,
    sponsor_id CHAR(36),
    title VARCHAR(255),
    budget_min INT,
    budget_max INT,
    status ENUM('Open','Closed') DEFAULT 'Open',
    FOREIGN KEY (sponsor_id) REFERENCES sponsor_profiles(id)
);

-- SPONSORSHIP APPLICATIONS
CREATE TABLE IF NOT EXISTS sponsorship_applications (
    id CHAR(36) PRIMARY KEY,
    event_id CHAR(36),
    sponsorship_role_id CHAR(36),
    status ENUM('submitted','accepted','rejected','completed'),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id),
    FOREIGN KEY (sponsorship_role_id) REFERENCES sponsorship_roles(id)
);

-- MENTORSHIP
CREATE TABLE IF NOT EXISTS mentor_profiles (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36),
    expertise TEXT,
    hourly_rate DECIMAL(10,2),
    rating DECIMAL(3,2) DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS mentorship_requests (
    id CHAR(36) PRIMARY KEY,
    mentor_id CHAR(36),
    mentee_id CHAR(36),
    status ENUM('pending','accepted','completed','rejected'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (mentor_id) REFERENCES mentor_profiles(id),
    FOREIGN KEY (mentee_id) REFERENCES users(id)
);

-- RECRUITMENT
CREATE TABLE IF NOT EXISTS job_postings (
    id CHAR(36) PRIMARY KEY,
    recruiter_id CHAR(36),
    title VARCHAR(255),
    description TEXT,
    location TEXT,
    deadline DATETIME,
    FOREIGN KEY (recruiter_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS shortlists (
    id CHAR(36) PRIMARY KEY,
    recruiter_id CHAR(36),
    candidate_id CHAR(36),
    job_id CHAR(36),
    status ENUM('interested','interviewing','hired','rejected'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recruiter_id) REFERENCES users(id),
    FOREIGN KEY (candidate_id) REFERENCES users(id),
    FOREIGN KEY (job_id) REFERENCES job_postings(id)
);

-- MESSAGING
CREATE TABLE IF NOT EXISTS chat_messages (
    id CHAR(36) PRIMARY KEY,
    sender_id CHAR(36),
    recipient_id CHAR(36),
    team_id CHAR(36),
    content TEXT NOT NULL,
    channel ENUM('Global','Team','Direct'),
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (recipient_id) REFERENCES users(id),
    FOREIGN KEY (team_id) REFERENCES teams(id)
);

-- ANNOUNCEMENTS
CREATE TABLE IF NOT EXISTS announcements (
    id CHAR(36) PRIMARY KEY,
    event_id CHAR(36),
    organizer_id CHAR(36),
    title VARCHAR(255),
    content TEXT,
    priority ENUM('low','medium','high','urgent'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id),
    FOREIGN KEY (organizer_id) REFERENCES users(id)
);

-- Team Members (Junction)
CREATE TABLE IF NOT EXISTS team_members (
    team_id CHAR(36),
    user_id CHAR(36),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (team_id, user_id),
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Event Registrations
CREATE TABLE IF NOT EXISTS event_registrations (
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
CREATE TABLE IF NOT EXISTS sponsor_profiles (
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
CREATE TABLE IF NOT EXISTS sponsorship_roles (
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
CREATE TABLE IF NOT EXISTS sponsorship_opportunities (
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
CREATE TABLE IF NOT EXISTS sponsorship_applications (
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
CREATE TABLE IF NOT EXISTS mentor_profiles (
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
CREATE TABLE IF NOT EXISTS mentorship_requests (
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
CREATE TABLE IF NOT EXISTS mentorship_sessions (
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
CREATE TABLE IF NOT EXISTS job_postings (
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
CREATE TABLE IF NOT EXISTS shortlists (
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
CREATE TABLE IF NOT EXISTS chat_messages (
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
CREATE TABLE IF NOT EXISTS announcements (
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


DELIMITER $$

-- 1. Auto-create user_stats after new user
CREATE TRIGGER trg_create_user_stats
AFTER INSERT ON users
FOR EACH ROW
BEGIN
    INSERT INTO user_stats (user_id) VALUES (NEW.id);
END$$

-- 2. Auto-increment participants_count after registration
CREATE TRIGGER trg_increment_participants
AFTER INSERT ON event_registrations
FOR EACH ROW
BEGIN
    UPDATE events
    SET participants_count = participants_count + 1
    WHERE id = NEW.event_id;
END$$

-- 3. Auto-decrement participants_count after registration deletion
CREATE TRIGGER trg_decrement_participants
AFTER DELETE ON event_registrations
FOR EACH ROW
BEGIN
    UPDATE events
    SET participants_count = participants_count - 1
    WHERE id = OLD.event_id;
END$$

-- 4. Prevent duplicate registration
CREATE TRIGGER trg_prevent_duplicate_registration
BEFORE INSERT ON event_registrations
FOR EACH ROW
BEGIN
    IF EXISTS (
        SELECT 1 FROM event_registrations
        WHERE event_id = NEW.event_id AND user_id = NEW.user_id
    ) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User already registered for this event';
    END IF;
END$$

-- 5. Prevent registration after deadline
CREATE TRIGGER trg_check_registration_deadline
BEFORE INSERT ON event_registrations
FOR EACH ROW
BEGIN
    DECLARE deadline DATETIME;
    SELECT registration_deadline INTO deadline
    FROM events
    WHERE id = NEW.event_id;

    IF deadline IS NOT NULL AND NOW() > deadline THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Registration deadline has passed';
    END IF;
END$$

DELIMITER ;


