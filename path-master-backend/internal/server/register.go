package server

import (
	"path-master-backend/internal/DTOs"
	"path-master-backend/internal/models"

	"github.com/gin-gonic/gin"
)

func (server *Server) Register(context *gin.Context) {
	var user DTOs.RegisterRequestDTO

	if err := context.ShouldBindJSON(&user); err != nil {
		context.JSON(400, gin.H{"error": err.Error()})
		return
	}

	var account models.UserAccount

	if err := server.Database.Where(&models.UserAccount{Email: user.Email}).First(&account); err.Error == nil {
		context.JSON(400, gin.H{"error": "user already exists"})
		return
	}

	account.Email = user.Email
	account.FirstName = user.FirstName
	account.LastName = user.LastName
	account.Password = user.Password

	if err := server.Database.Create(&account).Error; err != nil {
		context.JSON(500, gin.H{"error": "internal server error"})
		return

	}

	context.JSON(200, gin.H{
		"id":         account.ID,
		"email":      account.Email,
		"first_name": account.FirstName,
		"last_name":  account.LastName})
}
