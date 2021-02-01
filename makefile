init: init-git init-env

init-env:
	cp .env.example .env

init-git:
	cp .dev/git/hooks/prepare-commit-msg .git/hooks/prepare-commit-msg
