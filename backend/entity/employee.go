package entity


import (
	
   "time"
   "gorm.io/gorm"
)

type Employees struct {
	gorm.Model

	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	Email     string    `json:"email"`
	Phone     string    `json:"phone"`
	Age       uint8     `json:"age"`
	Address   string    `json:"Address"`
	BirthDay  time.Time `json:"birthday"`
	Password  string    `json:"-"`
	Salary    float32   `json:"salary"`
	Picture   string    `json:"picture" gorm:"type:longtext"`

	GenderID uint
	Gender   *Genders `gorm:"foreignKey:GenderID"`

	RoleID uint
	Role   *Roles `gorm:"foreignKey:RoleID"`

	StatusID uint
	Status   *Status `gorm:"foreignKey:StatusID"`

	ShipID uint
	Ship   *Ship `gorm:"foreignKey:ShipID"`

	CruiseTrip []CruiseTrip `gorm:"foreignKey:EmployeesID"`
}
