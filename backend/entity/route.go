package entity

import (
	"gorm.io/gorm"
)

type Routes struct {
	gorm.Model
	Name       string       `gorm:"uniqueIndex"`
	CruiseTrip []CruiseTrip `gorm:"foreignKey:RoutesID"`
}
