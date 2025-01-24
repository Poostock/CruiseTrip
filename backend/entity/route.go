package entity

import (
	"gorm.io/gorm"
)

type Routes struct {
	gorm.Model
	RouteName       string       `gorm:"uniqueIndex"`
	CruiseTrip []CruiseTrip `gorm:"foreignKey:RoutesID"`
}
