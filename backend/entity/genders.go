package entity


import "gorm.io/gorm"


type Genders struct {
	gorm.Model
	Gender    string       `json:"gender"`
	Employees []Employees `gorm:"foreignKey:GenderID"`
}
