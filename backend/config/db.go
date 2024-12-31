package config

import (
	"fmt"
	"time"

	"cruise/entity"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func ConnectionDB() {
	database, err := gorm.Open(sqlite.Open("sa.db?cache=shared"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	fmt.Println("connected database")
	db = database
}

func SetupDatabase() {
	db.AutoMigrate(
		&entity.Genders{},
		&entity.Employees{},
		&entity.Ship{},
		&entity.CruiseTrip{},
		&entity.Routes{},
		// &entity.Roles{},
		// &entity.Status{},
	)

	GenderMale := entity.Genders{Gender: "Male"}
	GenderFemale := entity.Genders{Gender: "Female"}

	db.FirstOrCreate(&GenderMale, &entity.Genders{Gender: "Male"})
	db.FirstOrCreate(&GenderFemale, &entity.Genders{Gender: "Female"})

	RouteJP := entity.Routes{Name: "SP-JP"}
	RouteTH := entity.Routes{Name: "SP-TH"}

	db.FirstOrCreate(&RouteJP, &entity.Routes{Name: "SP-JP"})
	db.FirstOrCreate(&RouteTH, &entity.Routes{Name: "SP-TH"})

	ShipArvia := entity.Ship{Name: "Arvia"}
	ShipCarnival := entity.Ship{Name: "Carnival Celebration"}

	db.FirstOrCreate(&ShipArvia, &entity.Ship{Name: "Arvia"})
	db.FirstOrCreate(&ShipCarnival, &entity.Ship{Name: "Carnival Celebration"})

	// RoleSoilder := entity.Roles{Role: "soilder"}
	// RoleCaptain := entity.Roles{Role: "captain"}

	// db.FirstOrCreate(&RoleSoilder, &entity.Routes{Name: "soilder"})
	// db.FirstOrCreate(&RoleCaptain, &entity.Routes{Name: "captain"})

	hashedPasswordAd, _ := HashPassword("123456")

	Admin := entity.Employees{
		FirstName: "MheeAdmin",
		LastName:  "AdminLastName",
		Email:     "PtAdmin@gmail.com",
		Phone:     "0812345678",
		Age:       30,
		Address:   "123 Admin Street",
		BirthDay:  time.Date(1993, time.March, 15, 0, 0, 0, 0, time.UTC),
		Password:  hashedPasswordAd,
		Salary:    50000.0,
		Picture:   "https://example.com/picture.jpg",
		GenderID:  2, // เพศหญิง
		// RoleID:    1, // บทบาท (เช่น Admin)
		// StatusID:  1, // สถานะ (เช่น Active)
		// ShipID:	   1,
	}

	db.FirstOrCreate(&Admin, entity.Employees{
		Email: "PtAdmin@gmail.com",
	})

	StartDate, _ := time.Parse("2006-01-02 15:04:05", "2024-08-31 14:30:00")
	EndDate, _ := time.Parse("2006-01-02 15:04:05", "2024-09-30 14:30:00")

	CruiseTrip := &entity.CruiseTrip{
		CruiseTripName: "Vietnam & Thailand Cruise",
		Deets:          "40 คืน",
		StartDate:      StartDate,
		EndDate:        EndDate,
		PlanPrice:      50000,
		ShipID:         1,
		RoutesID:       1,
		PlanImg:        "https://example.com/cruise_image.jpg",
		EmployeesID:    1,
		ParticNum:      40,
	}

	db.FirstOrCreate(CruiseTrip, &entity.CruiseTrip{
		CruiseTripName: "Vietnam & Thailand Cruise",
	})
}
