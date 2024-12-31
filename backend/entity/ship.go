package entity

import (
	"gorm.io/gorm"
)

type Ship struct {
	gorm.Model
	Name       string       `gorm:"uniqueIndex" valid:"required~กรอกชื่อเรือ"`
	CruiseTrip []CruiseTrip `gorm:"foreignKey:ShipID"`
	// Employees  []Employees `gorm:"foreignKey:ShipID"`
}
