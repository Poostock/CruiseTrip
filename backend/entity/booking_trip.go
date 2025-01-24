package entity

import (
	"time"

	"gorm.io/gorm"
)

type BookingTrip struct {
	gorm.Model
	BookingDate   time.Time `json:"bookingDate" valid:"required~bookingDate is required"`
	BookingStatus string `json:"bookingStatus" valid:"required~bookingStatus is required"`

	CruiseTripID uint `json:"CruiseTripID" valid:"required~CruiseTrip is required"`
	CruiseTrip   CruiseTrip `gorm:"foreignKey:CruiseTripID"`

	BookActivity []BookActivity `gorm:"foreignKey:BookingTripID"`
}
