package main

import (
	"log"
	"net"

	"golang.org/x/net/context"
	"google.golang.org/grpc"

	pb "../proto"
)

func main() {
	l, err := net.Listen("tcp", ":9999")
	if err != nil {
		log.Fatalln(err)
	}
	s := grpc.NewServer()
	pb.RegisterHelloServiceServer(s, &helloServiceServer{})

	log.Println("Listen tcp:9999")
	s.Serve(l)
}

// ---

type helloServiceServer struct{}

func (s *helloServiceServer) Hello(ctx context.Context, in *pb.HelloRequest) (*pb.HelloResponse, error) {
	log.Println("call from", in.Name)
	rsp := new(pb.HelloResponse)
	rsp.Message = "Hello " + in.Name + "."
	return rsp, nil
}
