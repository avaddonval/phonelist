--
-- PostgreSQL database dump
--

-- Dumped from database version 10.4 (Debian 10.4-2.pgdg90+1)
-- Dumped by pg_dump version 10.4 (Debian 10.4-2.pgdg90+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: contacts; Type: TABLE; Schema: public; Owner: phonelist
--

CREATE TABLE public.contacts (
    id integer NOT NULL,
    name text
);


ALTER TABLE public.contacts OWNER TO phonelist;

--
-- Name: contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: phonelist
--

CREATE SEQUENCE public.contacts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contacts_id_seq OWNER TO phonelist;

--
-- Name: contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: phonelist
--

ALTER SEQUENCE public.contacts_id_seq OWNED BY public.contacts.id;


--
-- Name: phones; Type: TABLE; Schema: public; Owner: phonelist
--

CREATE TABLE public.phones (
    id integer NOT NULL,
    phone text,
    contact_id integer
);


ALTER TABLE public.phones OWNER TO phonelist;

--
-- Name: phones_id_seq; Type: SEQUENCE; Schema: public; Owner: phonelist
--

CREATE SEQUENCE public.phones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.phones_id_seq OWNER TO phonelist;

--
-- Name: phones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: phonelist
--

ALTER SEQUENCE public.phones_id_seq OWNED BY public.phones.id;


--
-- Name: contacts id; Type: DEFAULT; Schema: public; Owner: phonelist
--

ALTER TABLE ONLY public.contacts ALTER COLUMN id SET DEFAULT nextval('public.contacts_id_seq'::regclass);


--
-- Name: phones id; Type: DEFAULT; Schema: public; Owner: phonelist
--

ALTER TABLE ONLY public.phones ALTER COLUMN id SET DEFAULT nextval('public.phones_id_seq'::regclass);


--
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: phonelist
--

COPY public.contacts (id, name) FROM stdin;
\.


--
-- Data for Name: phones; Type: TABLE DATA; Schema: public; Owner: phonelist
--

COPY public.phones (id, phone, contact_id) FROM stdin;
1	+77474159500	\N
34	+77086358129	\N
35	+77086358115	\N
\.


--
-- Name: contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: phonelist
--

SELECT pg_catalog.setval('public.contacts_id_seq', 1, false);


--
-- Name: phones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: phonelist
--

SELECT pg_catalog.setval('public.phones_id_seq', 35, true);


--
-- Name: contacts contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: phonelist
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);


--
-- Name: phones phones_pkey; Type: CONSTRAINT; Schema: public; Owner: phonelist
--

ALTER TABLE ONLY public.phones
    ADD CONSTRAINT phones_pkey PRIMARY KEY (id);


--
-- Name: phones phones_contact_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: phonelist
--

ALTER TABLE ONLY public.phones
    ADD CONSTRAINT phones_contact_id_fkey FOREIGN KEY (contact_id) REFERENCES public.contacts(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

