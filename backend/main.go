package main

import (
	// "net/http"

	"cruise/config"
	"cruise/controller"

	// "backend/middlewares"

	"github.com/gin-gonic/gin"
)

const PORT = "3036"

func main() {

	// open connection database
	config.ConnectionDB()

	// Generate databases
	config.SetupDatabase()

	r := gin.Default()

	r.Use(CORSMiddleware())

	// r.POST("/login", controller.SignIn)

	router := r.Group("")
	{
		// router.Use(middlewares.Authorizes()) 
		{

		// Gender Routes
		router.GET("/genders", controller.ListGenders)
		// CruiseTrip Routes
		router.GET("/cruisetrips", controller.ListCruiseTrips)
		router.GET("/cruisetrip/:id", controller.GetCruiseTrip)
		router.POST("/cruisetrips", controller.CreateCruiseTrip)
		router.PATCH("/cruisetrips", controller.UpdateCruiseTrip)
		router.DELETE("/cruisetrips/:id", controller.DeleteCruiseTrip)
		// router.GET("/cruisetrips/count", controller.CountCruiseTrip)
		// Ship Routes
		router.GET("/ships", controller.ListShips)
		router.GET("/ship/:id", controller.GetShip)
		router.POST("/ships", controller.CreateShip)
		router.PATCH("/ships", controller.UpdateShip)
		router.DELETE("/ships/:id", controller.DeleteShip)
		// Route Routes
		router.GET("/routes", controller.ListRoutes)
		router.GET("/route/:id", controller.GetRoutes)
		router.POST("/routes", controller.CreateRoute)
		router.PATCH("/routes", controller.UpdateRoute)
		router.DELETE("/routes/:id", controller.DeleteRoute)
		// Employee Routes
		router.GET("/employees", controller.ListAdmins)
		router.GET("/employee/:id", controller.GetAdmin)
		router.POST("/employees", controller.CreateAdmin)
		router.PATCH("/employees", controller.UpdateAdmin)
		router.DELETE("/employees/:id", controller.DeleteAdmin)

		//Count Staff
		// router.GET("/staffs/count", controller.CountStaffs)


		}
		
	}

	// r.GET("/", func(c *gin.Context) {
	// 	c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
	// })

	// Run the server

	r.Run("localhost:" + PORT)

}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}