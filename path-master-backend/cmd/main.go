package main

import "path-master-backend/internal/server"

func main() {
	server := new(server.Server)
	server.Init()
	server.Run("127.0.0.1:8080")
}
