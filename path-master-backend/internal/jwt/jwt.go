package jwt

import (
	"errors"
	"log"
	"path-master-backend/internal/models"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

const (
	jwtSecretKey = "supersecretkey"
)

func GenerateJwtToken(user *models.UserAccount, duration time.Duration) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"id":         user.ID,
			"email":      user.Email,
			"first_name": user.FirstName,
			"last_name":  user.LastName,
			"exp":        time.Now().Add(duration * time.Hour).Unix()})

	tokenString, err := token.SignedString([]byte(jwtSecretKey))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func GetToken(ctx *gin.Context) (string, error) {
	authorizationHeader := ctx.GetHeader("Authorization")

	if len(authorizationHeader) == 0 {
		err := errors.New("authorization header is not provided")

		return "", err
	}

	fields := strings.Fields(authorizationHeader)

	if len(fields) < 2 {

		err := errors.New("invalid Authorization header format")

		return "", err
	}

	authorizationType := strings.ToLower(fields[0])

	if strings.ToLower(authorizationType) != "bearer" {

		err := errors.New("unsupported authorization type")

		return "", err

	}

	accessToken := fields[1]

	return accessToken, nil
}

func ParseToken(ctx *gin.Context) (*jwt.Token, error) {

	tokenString, err := GetToken(ctx)

	if err != nil {
		return nil, err
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(jwtSecretKey), nil
	})

	if !token.Valid {
		return nil, errors.New("invalid token")
	}

	return token, err
}

func VerifyToken(ctx *gin.Context) error {

	_, err := ParseToken(ctx)

	if err != nil {
		return err
	}

	return nil
}

func GetClaims(tokenStr string) (jwt.MapClaims, bool) {
	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		return []byte(jwtSecretKey), nil
	})

	if err != nil {
		return nil, false
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return claims, true
	} else {
		log.Printf("invalid token string")
		return nil, false
	}
}
