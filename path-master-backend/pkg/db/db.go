package db

import (
	"fmt"
	"os"
	"path-master-backend/internal/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

const (
	DATABASE_HOSTNAME_ENV = "BACKEND_DB_HOSTNAME"
	DATABASE_PORT_ENV     = "BACKEND_DB_PORT"
	DATABASE_USER_ENV     = "BACKEND_DB_USERNAME"
	DATABASE_NAME_ENV     = "BACKEND_DB_NAME"
)

func DbHandlerNew() (*gorm.DB, error) {
	db_host := os.Getenv(DATABASE_HOSTNAME_ENV)
	db_port := os.Getenv(DATABASE_PORT_ENV)
	db_user := os.Getenv(DATABASE_USER_ENV)
	db_name := os.Getenv(DATABASE_NAME_ENV)

	dbConnectionString := fmt.Sprintf("postgres://%s:password@%s:%s/%s", db_user, db_host, db_port, db_name)

	db_handler, err := gorm.Open(postgres.Open(dbConnectionString), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	db_handler.AutoMigrate(&models.UserAccount{})
	return db_handler, nil
}
