package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type CruiseTrip struct {
	gorm.Model
	CruiseTripName string `gorm:"uniqueIndex" valid:"required~กรอกชื่อทริป"`
	Deets          string `valid:"required~ใส่ข้อความ, deets_valid~ใส่ข้อความ"`
	StartDate time.Time `valid:"required~เวลาห้ามเป็นอดีต, future~StartDate ต้องเป็นวันที่ในอนาคต"`
	EndDate   time.Time `valid:"required~เวลาห้ามเป็นอดีต, future~EndDate ต้องเป็นวันที่ในอนาคต"`
	PlanImg        string `valid:"required~ใส่รูปภาพ, image_valid~ใส่รูปภาพ"`
	PlanPrice      float64 `valid:"required~กรอกราคาช่วง 1000000 - 1000000, range(1000000|10000000)~กรอกราคาช่วง 1000000 - 1000000"`
	ParticNum      int `valid:"required~กรอกตัวเลข, description_valid~ใส่จำนวนคน"`

	ShipID      uint `valid:"required~กรอกชื่อเรือ"`
	Ship        Ship `gorm:"foreignKey:ShipID"`

	EmployeesID uint
	Employees   Employees `gorm:"foreignKey:EmployeesID"`

	RoutesID    uint `valid:"required~กรุณาเลือกเส้นทาง"`
	Routes      Routes `gorm:"foreignKey:RoutesID"`
}


func init() {
	govalidator.CustomTypeTagMap.Set("future", func(i interface{}, context interface{}) bool {
		if t, ok := i.(time.Time); ok {
			return t.After(time.Now())
		}
		return false
	})
}