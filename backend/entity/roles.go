package entity


import "gorm.io/gorm"


type Roles struct {
	gorm.Model
	Role      string       `json:"role"`
	Employees []Employees `gorm:"foreignKey:RoleID"`
}
