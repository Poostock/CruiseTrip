package controller

import (
	"net/http"
	"cruise/entity"
	"cruise/config"

	"github.com/gin-gonic/gin"
)

// POST /Admins
func CreateAdmin(c *gin.Context) {
	var admin entity.Employees

	// bind เข้าตัวแปร user
	if err := c.ShouldBindJSON(&admin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// ค้นหา gender ด้วย id
	var gender entity.Genders
	db.First(&gender, admin.GenderID)
	if gender.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "gender not found"})
		return
	}
	// var ship entity.Ship
    // db.First(&ship, admin.ShipID)
    // if ship.ID == 0 {
    //     c.JSON(http.StatusNotFound, gin.H{"error": "ship not found"})
    //     return
    // }

    // // // Validate route
    // var status entity.Status
    // db.First(&status, admin.StatusID)
    // if status.ID == 0 {
    //     c.JSON(http.StatusNotFound, gin.H{"error": "status not found"})
    //     return
    // }

    // // Validate admin
    // var role entity.Roles
    // db.First(&role, admin.RoleID)
    // if role.ID == 0 {
    //     c.JSON(http.StatusNotFound, gin.H{"error": "role not found"})
    //     return
    // }


	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashedPasswordAd, _ := config.HashPassword(admin.Password)

	// สร้าง User
	a := entity.Employees{
		FirstName: admin.FirstName, // ชื่อแรก
		LastName:  admin.LastName,  // นามสกุล
		Email:     admin.Email,     // อีเมล
		Phone:     admin.Phone,     // หมายเลขโทรศัพท์
		Age:       admin.Age,       // อายุ
		Address:   admin.Address,   // ที่อยู่
		BirthDay:  admin.BirthDay,  // วันเกิด
		Password:  hashedPasswordAd, // รหัสผ่าน (เข้ารหัสแล้ว)
		Salary:    admin.Salary,    // เงินเดือน
		Picture:   admin.Picture,   // รูปภาพ
	
		GenderID:  admin.GenderID,  // ID ของเพศ
		Gender:    &gender,          // โยงความสัมพันธ์กับเพศ
	
		// RoleID:    admin.RoleID,    // ID ของบทบาท
		// Role:      &role,            // โยงความสัมพันธ์กับบทบาท
	
		// StatusID:  admin.StatusID,  // ID ของสถานะ
		// Status:    &status,          // โยงความสัมพันธ์กับสถานะ
	
		// ShipID:    admin.ShipID,    // ID ของเรือ
		// Ship:      &ship,            // โยงความสัมพันธ์กับเรือ
	}
	

	// บันทึก
	if err := db.Create(&a).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": a})
}

// GET /admin/:id
func GetAdmin(c *gin.Context) {
	ID := c.Param("id")
	var admin entity.Employees

	db := config.DB()
	results := db.Preload("Gender").First(&admin, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if admin.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, admin)
}

// GET /admins
func ListAdmins(c *gin.Context) {

	var admins []entity.Employees

	db := config.DB()
	results := db.Preload("Gender").Find(&admins)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, admins)
}

// DELETE /admins/:id
func DeleteAdmin(c *gin.Context) {

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM admins WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}

// PATCH /admins
func UpdateAdmin(c *gin.Context) {
	var admin entity.Employees

	AdminID := c.Param("id")

	db := config.DB()
	result := db.First(&admin, AdminID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&admin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&admin)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}

func CountStaffs(c *gin.Context) {
    var adminCount int64
    var trainerCount int64

    db := config.DB()

    // Count admins
    if err := db.Model(&entity.Employees{}).Count(&adminCount).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    // Count trainers
    if err := db.Model(&entity.Routes{}).Count(&trainerCount).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    // Total count
    totalCount := adminCount + trainerCount
    c.JSON(http.StatusOK, gin.H{"count": totalCount})
}