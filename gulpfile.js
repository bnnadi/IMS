var async = require('async');
var chalk = require('chalk');
var dotenv = require('dotenv').config();
var gulp = require('gulp'),
    gutil = require('gulp-util');
var uuid = require('uuid/v4');

var Chance = require('chance');
var Sequelize = require("sequelize");

var config = {
    "database_name": process.env.DB_NAME,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "dialect": process.env.DB_DIALECT,
    "port": process.env.DB_PORT,
    // 'pool': {max: 1}
};
var chance = new Chance();
var sequelize = new Sequelize(config.database_name, config.username, config.password, config);

var db = require(__dirname + '/app/models/index');

var adminId;

gulp.task('default', function() {
    return gutil.log('Gulp is running!');
});

gulp.task('test-db', function() {
    return db.sequelize.sync({ force: true, match: /_test$/ }).catch();
});

gulp.task('local-db-force', function() {
    return db
            .sequelize
            .query('SET FOREIGN_KEY_CHECKS = 0', {raw: true})
            .then(function(results) {
                db.sequelize.sync({force: true});
            }).catch();
});

gulp.task('local-db', function() {
    return db.sequelize.sync().catch();
});

gulp.task('v0-create-company', function() {
    var Company = db.company;
    var companies = [{
            companyName: "Yana"
        },
        {
            companyName: "Willow"
        }
    ];

    return Company
        .bulkCreate(companies)
        .then(function(result) {
            console.log(result);
        })
        .catch(function(err) {
            console.log(err);
        });
});

gulp.task('v0-create-admin', function() {
    var User = db.user;
    var Address = db.user_address;
    var Phone = db.user_phone_number;

    var admin = {
        email: 'admin@example.com',
        firstName: chance.first(),
        lastName: chance.last(),
        password: 'password1',
        accountType: 'admin',
        companyId: 0
    };


    return User
        .create(admin)
        .then(function(user) {
            console.log(user.toJSON());
        })
        .catch(function(err) {
            console.log(err);
        });
});

gulp.task('v0-genrate-api-key', function() {
    var ApiKey = db.api_key;
    var now = new Date();
    var expiredDate = new Date(now.setFullYear(now.getFullYear() + 1));

    var api_key = {
        key: uuid(),
        ttl: expiredDate
    };

    return ApiKey
        .create(api_key)
        .then(function(key) {
            console.log(key.get());
        })
        .catch(function(err) {
            console.log(err);
        });
});

gulp.task('v1-create-organization', () => {
    var Organization = db.organization;
    var OrganizationUnit = db.organization_unit;
    async.series({
        organizations: (cb) => {
            var organizations = [{
                organization_name: "Yana",
                address: chance.address(),
            },
            {
                organization_name: "Willow",
                address: chance.address(),
            }
        ];
        Organization
            .bulkCreate(organizations)
            .then(() => { // Notice: There are no arguments here, as of right now you'll have to...
                return Organization.findAll();
            }).then(organizations => {
                cb(organizations) // ... in order to get the array of user objects
            })
        }
    }, (result, err) => {

        result.forEach(org => {
            console.log(org)
            var organizationUnits = [
                {
                    organization_id: org.organization_id,
                    organization_unit_name: "Accounting and Finance",
                },
                {
                    organization_id: org.organization_id,
                    organization_unit_name: "Production",
                },
                {
                    organization_id: org.organization_id,
                    organization_unit_name: "Human Resource",
                },
                {
                    organization_id: org.organization_id,
                    organization_unit_name: "Marketing",
                },
                {
                    organization_id: org.organization_id,
                    organization_unit_name: "Research and Development",
                },
                {
                    organization_id: org.organization_id,
                    organization_unit_name: "Security",
                }
            ]

            OrganizationUnit
                .bulkCreate(organizationUnits)
                .then((result) => {
                    console.log(result);
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        
    })
    
});


gulp.task('v1-create-permission-levels', () => {
    var Permission = db.permission_level;

    var permissions = [
        {
            permission_level_code: 1,
            permission_level_description: 'Self Read/Write'
        },
        {
            permission_level_code: 2,
            permission_level_description: 'Other Read/Write'
        },
        {
            permission_level_code: 3,
            permission_level_description: 'Other Read/Write/Delete'
        },
        {
            permission_level_code: 4,
            permission_level_description: 'Full Access'
        }
    ];

    return Permission
        .bulkCreate(permissions)
        .then(function(result) {
            console.log(result);
        })
        .catch(function(err) {
            console.log(err);
        });

});

gulp.task('v1-create-roles', () => {
    var Role = db.role;

    var roles = [
        {
            role_description: 'CEO'
        },
        {
            role_description: 'Product Manager'
        },
        {
            role_description: 'Sales Manager'
        },
        {
            role_description: 'Security Manager'
        },
        {
            role_description: 'Sales Agent'
        },
        {
            role_description: 'Factory Worker'
        },
        {
            role_description: 'Security Agent'
        },
    ];

    return Role
        .bulkCreate(roles)
        .then(function(result) {
            console.log(result);
        })
        .catch(function(err) {
            console.log(err);
        });

});

gulp.task('v1-create-transaction-types', () => {
    var Transaction = db.transaction_type;

    var types = [
        {
            transaction_type_name: 'cash'
        },
        {
            transaction_type_name: 'credit'
        }
    ];


    return Transaction
        .bulkCreate(types)
        .then((types) => {
            console.log(types);
        })
        .catch((err) => {
            console.log(err);
        });
});

gulp.task('v1-create-admin', () => {
    var Employee = db.employee;
    var Assignment = db.employee_assignment;
    var Address = db.address;
    var Phone = db.phone_number;
    var Setting = db.setting;

    var admin = {
        email: 'admin@example.com',
        first_name: chance.first(),
        last_name: chance.last(),
        password: 'password1',
        permission_level_code: 4
    };


    return Employee
        .create(admin)
        .then((admin) => {
            Setting
                .create()
                .then(setting => {
                    admin.setSetting(admin.employee_id);
                })
            Assignment
                .create()
                .then(assign => {
                    admin.setAssignment(assign.date_from)
                })
            Address
                .create({
                    address_line_1: chance.address(),
                    town_city: chance.city(),
                    state_county_province: chance.state({ full: true }),
                    country: chance.country({ full: true }),
                })
                .then(address => {
                    admin.setAddress(address.address_id);
                })

            Phone
                .create({
                    phone_number: chance.phone({ formatted: false })
                })
                .then(phone => {
                    admin.setPhone( phone.phone_number_id);
                })
        })
        .catch((err) => {
            console.log(err);
        });
});

gulp.task('v1-create-admin-aws', () => {
    var Employee = db.employee;
    var Assignment = db.employee_assignment;
    var Address = db.address;
    var Phone = db.phone_number;
    var Setting = db.setting;

    var admin = {
        email: 'admin@denadis.com',
        first_name: 'Admin',
        last_name: 'Nnadi',
        password: 'password1',
        permission_level_code: 4
    };


    return Employee
        .create(admin)
        .then((admin) => {
            Setting
                .create()
                .then(setting => {
                    admin.setSetting(admin.employee_id);
                })
            Assignment
                .create()
                .then(assign => {
                    admin.setAssignment(assign.date_from)
                })
            Address
                .create({
                    address_line_1: '13412 Splash Ct.',
                    town_city: 'Orlando',
                    state_county_province: 'Florida',
                    country: 'United States',
                })
                .then(address => {
                    admin.setAddress(address.address_id);
                })

            Phone
                .create({
                    phone_number: '4077054718'
                })
                .then(phone => {
                    admin.setPhone( phone.phone_number_id);
                })
        })
        .catch((err) => {
            console.log(err);
        });
});

gulp.task('v1-create-sales-manager', () => {
    var Employee = db.employee;
    var Assignment = db.employee_assignment;
    var Address = db.address;
    var Phone = db.phone_number;
    var Setting = db.setting;

    var smanage = {
        email: 'smanager@example.com',
        first_name: chance.first(),
        last_name: chance.last(),
        password: 'password1',
        permission_level_code: 3
    };


    return Employee
        .create(smanage)
        .then((smanage) => {
            Setting
                .create()
                .then(setting => {
                    smanage.setSetting(smanage.employee_id);
                })
            Assignment
                .create()
                .then(assign => {
                    smanage.setAssignment(assign.date_from)
                })
            Address
                .create({
                    address_line_1: chance.address(),
                    town_city: chance.city(),
                    state_county_province: chance.state({ full: true }),
                    country: chance.country({ full: true }),
                })
                .then(address => {
                    smanage.setAddress(address.address_id);
                })

            Phone
                .create({
                    phone_number: chance.phone({ formatted: false })
                })
                .then(phone => {
                    smanage.setPhone( phone.phone_number_id);
                })
        })
        .catch((err) => {
            console.log(err);
        });
});

gulp.task('v1-create-product-manager', () => {
    var Employee = db.employee;
    var Assignment = db.employee_assignment;
    var Address = db.address;
    var Phone = db.phone_number;
    var Setting = db.setting;

    var pmanage = {
        email: 'pmanager1@example.com',
        first_name: chance.first(),
        last_name: chance.last(),
        password: 'password1',
        permission_level_code: 3
    };


    return Employee
        .create(pmanage)
        .then((pmanage) => {
            Setting
                .create()
                .then(setting => {
                    pmanage.setSetting(pmanage.employee_id);
                })
            Assignment
                .create()
                .then(assign => {
                    pmanage.setAssignment(assign.date_from)
                })
            Address
                .create({
                    address_line_1: chance.address(),
                    town_city: chance.city(),
                    state_county_province: chance.state({ full: true }),
                    country: chance.country({ full: true }),
                })
                .then(address => {
                    pmanage.setAddress(address.address_id);
                })

            Phone
                .create({
                    phone_number: chance.phone({ formatted: false })
                })
                .then(phone => {
                    pmanage.setPhone( phone.phone_number_id);
                }) 
        })
        .catch((err) => {
            console.log(err);
        });
});

gulp.task('v1-create-guard', () => {
    var Employee = db.employee;
    var Assignment = db.employee_assignment;
    var Address = db.address;
    var Phone = db.phone_number;
    var Setting = db.setting;

    var n = Math.ceil(Math.random(20))

    var guard = {
        email: 'guard@example.com',
        first_name: chance.first(),
        last_name: chance.last(),
        password: 'password1',
        permission_level_code: 1
    };


    return Employee
        .create(guard)
        .then((guard) => {
            Setting
                .create()
                .then(setting => {
                    guard.setSetting(guard.employee_id);
                })
            Assignment
                .create()
                .then(assign => {
                    guard.setAssignment(assign.date_from)
                })
            Address
                .create({
                    address_line_1: chance.address(),
                    town_city: chance.city(),
                    state_county_province: chance.state({ full: true }),
                    country: chance.country({ full: true }),
                })
                .then(address => {
                    guard.setAddress(address.address_id);
                })

            Phone
                .create({
                    phone_number: chance.phone({ formatted: false })
                })
                .then(phone => {
                    guard.setPhone( phone.phone_number_id);
                })
 
        })
        .catch((err) => {
            console.log(err);
        });
});

gulp.task('v1-create-factory', () => {
    var Employee = db.employee;
    var Assignment = db.employee_assignment;
    var Address = db.address;
    var Phone = db.phone_number;
    var Setting = db.setting;

    var factory = {
        email: 'factory3@example.com',
        first_name: chance.first(),
        last_name: chance.last(),
        password: 'password1',
        permission_level_code: 1
    };


    return Employee
        .create(factory)
        .then((factory) => {
            Setting
                .create()
                .then(setting => {
                    factory.setSetting(factory.employee_id);
                })
            Assignment
                .create()
                .then(assign => {
                    factory.setAssignment(assign.date_from)
                })
           
            Address
                .create({
                    address_line_1: chance.address(),
                    town_city: chance.city(),
                    state_county_province: chance.state({ full: true }),
                    country: chance.country({ full: true }),
                })
                .then(address => {
                    factory.setAddress(address.address_id);
                })

            Phone
                .create({
                    phone_number: chance.phone({ formatted: false })
                })
                .then(phone => {
                    factory.setPhone( phone.phone_number_id);
                })
        })
        .catch((err) => {
            console.log(err);
        });
});


gulp.task('v1-create-agent', () => {
    var Employee = db.employee;
    var Assignment = db.employee_assignment;
    var Address = db.address;
    var Phone = db.phone_number;
    var Setting = db.setting;

    var agent = {
        email: 'agent@example.com',
        first_name: chance.first(),
        last_name: chance.last(),
        password: 'password1',
        permission_level_code: 1
    };


    return Employee
        .create(agent)
        .then((agent) => {
            Setting
                .create()
                .then(setting => {
                    agent.setSetting(agent.employee_id);
                })
            Assignment
                .create()
                .then(assign => {
                    agent.setAssignment(assign.date_from)
                })
            Address
                .create({
                    address_line_1: chance.address(),
                    town_city: chance.city(),
                    state_county_province: chance.state({ full: true }),
                    country: chance.country({ full: true }),
                })
                .then(address => {
                    agent.setAddress(address.address_id);
                })

            Phone
                .create({
                    phone_number: chance.phone({ formatted: false })
                })
                .then(phone => {
                    agent.setPhone( phone.phone_number_id);
                })
        })
        .catch((err) => {
            console.log(err);
        });
});

gulp.task('v1-create',['v1-create-organization','v1-create-permission-levels','v1-create-roles','v1-create-transaction-types','v1-create-admin','v1-create-product-manager','v1-create-sales-manager','v1-create-agent', 'v1-create-guard', 'v1-create-factory']);
