from rest_framework import views, response, status
from django.core.exceptions import ObjectDoesNotExist
from . import models, serializers


class GetProduct(views.APIView):
    def get(self, request, pk, format=None):
        try:
            product = models.Product.objects.get(_id=pk)
            serializer = serializers.ProductSerializer(product, many=False)
            return response.Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return response.Response({'message': 'Record does not exist'}, status=status.HTTP_404_NOT_FOUND)


class GetProducts(views.APIView):
    def get(self, request, format=None):
        products = models.Product.objects.all()
        serializer = serializers.ProductSerializer(products, many=True)
        return response.Response(serializer.data)



