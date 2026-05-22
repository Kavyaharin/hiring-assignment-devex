FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /app

COPY deployment-registry ./deployment-registry

WORKDIR /app/deployment-registry

RUN dotnet restore src/DeploymentRegistry.sln

RUN dotnet publish src/DeploymentRegistry.sln -c Release -o /publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0

WORKDIR /app

COPY --from=build /publish .

EXPOSE 8080

ENTRYPOINT ["dotnet", "DeploymentRegistry.Api.dll"]