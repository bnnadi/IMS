
all:
	@echo "Doing all"

deploy:
	@echo "Pushing to live"
	@git push git@104.131.110.212:~/ndeputa development

update:
	@echo "Makefile: Doing UPDATE stuff like grunt, gulp, rake,..."
	@whoami
	@pwd