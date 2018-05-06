
all:
	@echo "Doing all"

deploy-dev:
	@echo "Pushing to dev"
	@git push git@159.65.174.185:~/ndeputa development

deploy-prod:
	@echo "Pushing to prod"
	@git push git@159.65.170.42:~/ndeputa master

update:
	@echo "Makefile: Doing UPDATE stuff like grunt, gulp, rake,..."
	@whoami
	@pwd