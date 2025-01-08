package server

import (
	"path-master-backend/internal/DTOs"
	"path-master-backend/internal/jwt"
	"path-master-backend/internal/models"

	"github.com/gin-gonic/gin"
)

func (server *Server) Login(context *gin.Context) {
	var loginRequest DTOs.LoginRequestDTO

	if err := context.ShouldBindJSON(&loginRequest); err != nil {
		context.JSON(400, gin.H{"error": err.Error()})
		return
	}

	var account models.UserAccount

	if err := server.Database.Where(&models.UserAccount{Email: loginRequest.Email,
		Password: loginRequest.Password}).First(&account); err.Error != nil {
		context.JSON(403, gin.H{"error": "incorrect login or password"})
		return
	}

	token, err := jwt.GenerateJwtToken(&account, 24)

	if err != nil {
		context.JSON(500, gin.H{"error": "JWT token generate failed"})
		return
	}

	context.JSON(200, gin.H{"auth-token": token})
}
