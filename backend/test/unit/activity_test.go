package unit

import (
	"cruise/entity"
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestActivity(t *testing.T){
	g := NewGomegaWithT(t)
	t.Run(`Activity is positive`, func(t *testing.T){
		activity := entity.Activity{
			Name: "Bicycle",
			ActivityImg: "example.png",
		}
		ok, err := govalidator.ValidateStruct(activity)

	// ok ต้องไม่เป็นค่า true
		g.Expect(ok).To(BeTrue())
	// err ต้องไม่เป็นค่า nil
		g.Expect(err).To(BeNil())
	})

	// t.Run(`Name is negative`, func(t *testing.T){
	// 	activity := entity.Activity{
	// 		Name: "",
	// 		ActivityImg: "example.png",
	// 	}
	// 	ok, err := govalidator.ValidateStruct(activity)

	// // ok ต้องไม่เป็นค่า true
	// 	g.Expect(ok).NotTo(BeTrue())
	// // err ต้องไม่เป็นค่า nil
	// 	g.Expect(err).NotTo(BeNil())
	// 	g.Expect(err.Error()).To(Equal("Name is required"))
	// })

	t.Run(`Img is negative`, func(t *testing.T){
		activity := entity.Activity{
			Name: "Bicycle",
			ActivityImg: "",
		}
		ok, err := govalidator.ValidateStruct(activity)

	// ok ต้องไม่เป็นค่า true
		g.Expect(ok).NotTo(BeTrue())
	// err ต้องไม่เป็นค่า nil
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Image is required"))
	})
}