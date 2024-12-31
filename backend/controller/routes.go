package controller


import (
	"net/http"

	"cruise/config"
	"cruise/entity"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// Routes Controller

// GET /routes
func ListRoutes(c *gin.Context) {
	var routes []entity.Routes

	db := config.DB()

	db.Find(&routes)

	c.JSON(http.StatusOK, &routes)

}

// GET /route/:id
func GetRoutes(c *gin.Context) {
	var route entity.Routes
	ID := c.Param("id")
	db := config.DB()

	results := db.Preload("Weather").First(&route, ID)

	if results.Error != nil {
		if results.Error == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Route not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		}
		return
	}
	if route.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, route)
}

// POST /routes
func CreateRoute(c *gin.Context) {
	var route entity.Routes

	if err := c.ShouldBindJSON(&route); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	if err := db.Create(&route).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": route})
}

// PATCH /route/:id
func UpdateRoute(c *gin.Context) {
	var route entity.Routes
	RouteID := c.Param("id")
	db := config.DB()

	result := db.First(&route, RouteID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&route); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&route)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}

// DELETE /route/:id
func DeleteRoute(c *gin.Context) {
	id := c.Param("id")
	db := config.DB()

	if tx := db.Exec("DELETE FROM routes WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})
}