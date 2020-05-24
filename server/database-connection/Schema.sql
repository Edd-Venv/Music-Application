


create table music (
    artist_id SERIAL PRIMARY KEY,
    person_id UUID NOT NULL,
    artist_image VARCHAR NOT NULL,
    song_key BIGINT NOT NULL,
    artist_name VARCHAR NOT NULL,
    song_title VARCHAR NOT NULL,
    album_title VARCHAR NOT NULL,
    explicit_lyrics BOOLEAN NOT NULL,
    song VARCHAR NOT NULL,
    id_uid UUID REFERENCES person
);      
          
         

create table person (
    id_uid UUID PRIMARY KEY NOT NULL,
    person_name VARCHAR(50) NOT NULL,
    password VARCHAR(400) NOT NULL,
    refreshtoken VARCHAR,
    person_image VARCHAR,
    password_reset_token VARCHAR,
    password_reset_expires NUMERIC,
    UNIQUE(person_name),
    UNIQUE(refreshtoken)
);