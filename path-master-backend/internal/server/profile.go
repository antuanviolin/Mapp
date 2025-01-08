package server

import (
	"path-master-backend/internal/DTOs"
	"path-master-backend/internal/jwt"

	"github.com/gin-gonic/gin"
)

func (server *Server) Profile(context *gin.Context) {
	tokenString, err := jwt.GetToken(context)

	if err != nil {
		context.JSON(401, gin.H{"error": err.Error()})
		context.Abort()
		return
	}

	claims, ok := jwt.GetClaims(tokenString)
	if !ok {
		context.JSON(400, gin.H{"error": "jwt token parse failed"})
		context.Abort()
		return
	}

	profileResponse := &DTOs.ProfileResponseDTO{
		FirstName: claims["first_name"].(string),
		LastName:  claims["last_name"].(string),
		Email:     claims["email"].(string),
	}

	context.JSON(200, profileResponse)
}
