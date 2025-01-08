package middlewares

import (
	"path-master-backend/internal/jwt"

	"github.com/gin-gonic/gin"
)

func AuthHandler() gin.HandlerFunc {
	return func(context *gin.Context) {
		if err := jwt.VerifyToken(context); err == nil {
			context.Next()
		} else {
			context.JSON(401, gin.H{"error": "unauthorized"})
			context.Abort()
			return
		}
	}
}
