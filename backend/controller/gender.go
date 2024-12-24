package controller

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"cruise/entity"
	"cruise/config"

)
func ListGenders(c *gin.Context) {
	var gender []entity.Genders

	db := config.DB()

	db.Find(&gender)

	c.JSON(http.StatusOK, &gender)
}