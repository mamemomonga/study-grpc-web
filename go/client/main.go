package main

import (
	"log"
	"time"

	pb "../proto"

	"golang.org/x/net/context"
	"google.golang.org/grpc"
)

const (
	address = "localhost:9999"
)

func main() {
	// Set up a connection to the server.
	conn, err := grpc.Dial(address, grpc.WithInsecure())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	c := pb.NewHelloServiceClient(conn)

	// Contact the server and print out its response.
	name := "HEEEEELLLLLOOOOO"

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()

	r, err := c.Hello(ctx, &pb.HelloRequest{Name: name})
	if err != nil {
		log.Fatalf("could not greet: %v", err)
	}
	log.Printf("Greeting: %s", r.Message)
}
