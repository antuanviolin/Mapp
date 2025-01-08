package server

import (
	"net/http"

	"path-master-backend/middlewares"
	"path-master-backend/pkg/db"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Server struct {
	Database *gorm.DB
	Router   *gin.Engine
}

func (server *Server) Init() error {
	dbHandler, err := db.DbHandlerNew()

	if err != nil {
		return err
	}

	server.Database = dbHandler

	server.Router = gin.New()
	api := server.Router.Group("/api/v0")
	{
		auth := api.Group("/auth")
		{
			auth.POST("/login", server.Login)
			auth.POST("/register", server.Register)
		}

		secured := api.Group("").Use(middlewares.AuthHandler())
		{
			secured.GET("/profile", server.Profile)
		}
	}

	server.Database = dbHandler
	return nil
}

func (server *Server) Run(addr string) {
	http.ListenAndServe(addr, server.Router)
}
