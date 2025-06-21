CREATE TABLE public.blog_posts (
    id integer NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    content text NOT NULL,
    excerpt text,
    featured_image text,
    meta_title text,
    meta_description text,
    canonical_url text,
    tags text[],
    category text,
    is_published boolean DEFAULT false,
    published_at timestamp without time zone,
    author_id integer,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.blog_posts OWNER TO neondb_owner;

CREATE SEQUENCE public.blog_posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.blog_posts_id_seq OWNER TO neondb_owner;

ALTER SEQUENCE public.blog_posts_id_seq OWNED BY public.blog_posts.id;


--
-- Name: inquiries; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.inquiries (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    company text,
    service text,
    message text,
    status text DEFAULT 'new'::text,
    source text DEFAULT 'website'::text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.inquiries OWNER TO neondb_owner;

CREATE SEQUENCE public.inquiries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inquiries_id_seq OWNER TO neondb_owner;

ALTER SEQUENCE public.inquiries_id_seq OWNED BY public.inquiries.id;


--
-- Name: pages; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.pages (
    id integer NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    content text NOT NULL,
    meta_title text,
    meta_description text,
    canonical_url text,
    is_published boolean DEFAULT false,
    author_id integer,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.pages OWNER TO neondb_owner;

CREATE SEQUENCE public.pages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pages_id_seq OWNER TO neondb_owner;

ALTER SEQUENCE public.pages_id_seq OWNED BY public.pages.id;


--
-- Name: seo_settings; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.seo_settings (
    id integer NOT NULL,
    page_type text NOT NULL,
    settings json NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.seo_settings OWNER TO neondb_owner;

CREATE SEQUENCE public.seo_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.seo_settings_id_seq OWNER TO neondb_owner;

ALTER SEQUENCE public.seo_settings_id_seq OWNED BY public.seo_settings.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role text DEFAULT 'editor'::text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO neondb_owner;

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO neondb_owner;

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: blog_posts id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.blog_posts ALTER COLUMN id SET DEFAULT nextval('public.blog_posts_id_seq'::regclass);


--
-- Name: inquiries id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.inquiries ALTER COLUMN id SET DEFAULT nextval('public.inquiries_id_seq'::regclass);


--
-- Name: pages id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.pages ALTER COLUMN id SET DEFAULT nextval('public.pages_id_seq'::regclass);


--
-- Name: seo_settings id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.seo_settings ALTER COLUMN id SET DEFAULT nextval('public.seo_settings_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: blog_posts; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.blog_posts (id, title, slug, content, excerpt, featured_image, meta_title, meta_description, canonical_url, tags, category, is_published, published_at, author_id, created_at, updated_at) VALUES ('1', 'The Future of Remote Work: Trends to Watch in 2025', 'future-of-remote-work-2025', 'Remote work has evolved from a temporary pandemic solution to a permanent fixture in the modern workplace. As we look ahead to 2025, several key trends are shaping how businesses approach distributed teams and virtual collaboration...', 'Explore the latest remote work trends and how they''re shaping the future of global employment in 2025.', 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', '\N', '\N', '\N', '{"remote work","future trends",2025,"virtual teams"}', 'Staffing Trends', true, '\N', '1', '2025-06-13 17:25:09.811866', '2025-06-13 17:25:09.811866');

INSERT INTO public.blog_posts (id, title, slug, content, excerpt, featured_image, meta_title, meta_description, canonical_url, tags, category, is_published, published_at, author_id, created_at, updated_at) VALUES ('2', '5 Best Practices for Hiring Virtual Teams', 'hiring-virtual-teams-best-practices', 'Building effective virtual teams requires a strategic approach that goes beyond traditional hiring methods. Here are five proven practices that successful companies use to build high-performing remote teams...', 'Learn proven strategies for building effective virtual teams that drive business success.', 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', '\N', '\N', '\N', '{"virtual teams",hiring,"best practices","remote hiring"}', 'HR Management', true, '\N', '1', '2025-06-13 17:25:09.811866', '2025-06-13 17:25:09.811866');

INSERT INTO public.blog_posts (id, title, slug, content, excerpt, featured_image, meta_title, meta_description, canonical_url, tags, category, is_published, published_at, author_id, created_at, updated_at) VALUES ('3', 'Global Workforce Management in 2025', 'global-workforce-management-2025', 'Managing international teams presents unique challenges and opportunities. As businesses expand globally, understanding how to effectively manage diverse, distributed workforces becomes crucial for success...', 'Navigate the complexities of managing international teams with expert insights and strategies.', 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', '\N', '\N', '\N', '{"global workforce",management,"international teams",2025}', 'Industry Insights', true, '\N', '1', '2025-06-13 17:25:09.811866', '2025-06-13 17:25:09.811866');


--
-- Data for Name: inquiries; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.inquiries (id, name, email, company, service, message, status, source, created_at, updated_at) VALUES ('1', 'Hamza', '1i1o2i3@anoan.com', 'Hajsdan', 'direct', 'jkansodnoan', 'new', 'website', '2025-06-13 17:16:17.450413', '2025-06-13 17:16:17.450413');


--
-- Data for Name: pages; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--


--
-- Data for Name: seo_settings; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

INSERT INTO public.users (id, username, email, password, role, created_at, updated_at) VALUES ('1', 'admin', 'admin@admin.com', '$2b$10$hFdbkQSl0WpopcJGBTWqreBR.LtaYhNwDBkcMg9kkZadc/dG79Zmq', 'admin', '2025-06-13 17:13:51.554799', '2025-06-13 17:13:51.554799');


--
-- Name: blog_posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--


--
-- Name: inquiries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--


--
-- Name: pages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--


--
-- Name: seo_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--


--
-- Name: blog_posts blog_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT blog_posts_pkey PRIMARY KEY (id);


--
-- Name: blog_posts blog_posts_slug_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT blog_posts_slug_unique UNIQUE (slug);


--
-- Name: inquiries inquiries_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.inquiries
    ADD CONSTRAINT inquiries_pkey PRIMARY KEY (id);


--
-- Name: pages pages_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_pkey PRIMARY KEY (id);


--
-- Name: pages pages_slug_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_slug_unique UNIQUE (slug);


--
-- Name: seo_settings seo_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.seo_settings
    ADD CONSTRAINT seo_settings_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_unique; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_unique UNIQUE (username);


--
-- Name: blog_posts blog_posts_author_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT blog_posts_author_id_users_id_fk FOREIGN KEY (author_id) REFERENCES public.users(id);


--
-- Name: pages pages_author_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_author_id_users_id_fk FOREIGN KEY (author_id) REFERENCES public.users(id);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--