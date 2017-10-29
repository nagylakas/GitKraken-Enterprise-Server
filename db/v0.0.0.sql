CREATE TABLE info
(
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE users
(
  uid      UUID PRIMARY KEY,
  email    TEXT        NOT NULL UNIQUE,
  password TEXT        NOT NULL,
  name     TEXT                            DEFAULT NULL,
  status   TEXT        NOT NULL            DEFAULT 'pending',
  features JSON        NOT NULL            DEFAULT '[]',
  expires  TIMESTAMPTZ                     DEFAULT NULL,
  admin    BOOLEAN     NOT NULL            DEFAULT FALSE,
  regdate  TIMESTAMPTZ NOT NULL            DEFAULT NOW()
);

CREATE TABLE tokens (
  token   TEXT NOT NULL,
  useruid UUID NOT NULL REFERENCES users (uid) ON DELETE RESTRICT ON UPDATE RESTRICT,
  expires TIMESTAMPTZ,
  scope   TEXT NOT NULL,
  UNIQUE (token, scope)
);

INSERT INTO info VALUES ('version', '0.0.0');
