-- CreateTable
CREATE TABLE `driver` (
    `DriverID` INTEGER NOT NULL AUTO_INCREMENT,
    `DriverUserID` INTEGER NOT NULL,
    `CNIC` VARCHAR(45) NOT NULL,
    `LicenseNumber` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`DriverID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `institute` (
    `InstituteID` INTEGER NOT NULL AUTO_INCREMENT,
    `InstituteName` VARCHAR(45) NOT NULL,
    `dateJoined` VARCHAR(45) NOT NULL,
    `numberofUsers` INTEGER NULL,
    `latitude` FLOAT NOT NULL,
    `longitude` FLOAT NOT NULL,

    PRIMARY KEY (`InstituteID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `level` (
    `LevelID` INTEGER NOT NULL AUTO_INCREMENT,
    `levelName` VARCHAR(45) NULL,
    `levelDescription` VARCHAR(45) NULL,

    PRIMARY KEY (`LevelID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nearestlandmark` (
    `NearestLandmarkID` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(45) NULL,
    `Latitude` FLOAT NULL,
    `Longitude` FLOAT NULL,

    PRIMARY KEY (`NearestLandmarkID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `referrals` (
    `ReferralID` INTEGER NOT NULL AUTO_INCREMENT,
    `FromUserID` INTEGER NULL,
    `ToUserID` INTEGER NULL,
    `Testimonial` VARCHAR(45) NULL,

    INDEX `FromUserID`(`FromUserID`),
    INDEX `ToUserID`(`ToUserID`),
    PRIMARY KEY (`ReferralID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ride` (
    `RideID` INTEGER NOT NULL AUTO_INCREMENT,
    `DriverID` INTEGER NOT NULL,
    `numberOfPeople` INTEGER NOT NULL,
    `fareEntered` VARCHAR(45) NOT NULL,

    INDEX `DriverID`(`DriverID`),
    INDEX `RiderUserID`(`numberOfPeople`),
    PRIMARY KEY (`RideID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rideinfo` (
    `idRideInfo` INTEGER NOT NULL AUTO_INCREMENT,
    `RideID` INTEGER NOT NULL,
    `PassengerID` INTEGER NOT NULL,
    `DriverID` INTEGER NOT NULL,
    `StatusID` INTEGER NOT NULL,
    `passengerLatitude` VARCHAR(45) NOT NULL,
    `driverLatitude` VARCHAR(45) NOT NULL,
    `passengerLongitude` VARCHAR(45) NOT NULL,
    `driverLongitude` VARCHAR(45) NOT NULL,
    `fareDecided` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `idRideInfo_UNIQUE`(`idRideInfo`),
    INDEX `DriverID`(`DriverID`),
    INDEX `PassengerID`(`PassengerID`),
    INDEX `RideID`(`RideID`),
    INDEX `StatusID`(`StatusID`),
    PRIMARY KEY (`idRideInfo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ridenegotiation` (
    `ridenegotiationId` INTEGER NOT NULL AUTO_INCREMENT,
    `driverFare` VARCHAR(45) NOT NULL,
    `rideinfoID` INTEGER NOT NULL,
    `userFare` VARCHAR(45) NOT NULL,
    `finalFare` VARCHAR(45) NOT NULL,

    INDEX `rideinfoID`(`rideinfoID`),
    PRIMARY KEY (`ridenegotiationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `status` (
    `statusID` INTEGER NOT NULL AUTO_INCREMENT,
    `status Name` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`statusID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `userID` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(45) NOT NULL,
    `lastName` VARCHAR(45) NOT NULL,
    `instituteID` INTEGER NOT NULL,
    `levelID` INTEGER NOT NULL DEFAULT 1,
    `gender` VARCHAR(45) NOT NULL,
    `emailID` VARCHAR(45) NOT NULL,
    `password` VARCHAR(45) NOT NULL,
    `profileImageUrl` VARCHAR(45) NULL,
    `dateJoined` VARCHAR(45) NOT NULL,
    `isEmailVerified` TINYINT NOT NULL DEFAULT 0,
    `numOfReferrals` INTEGER NULL DEFAULT 0,

    INDEX `instituteID`(`instituteID`),
    INDEX `levelID`(`levelID`),
    PRIMARY KEY (`userID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicle` (
    `vehicleID` INTEGER NOT NULL AUTO_INCREMENT,
    `VehicleNumber` VARCHAR(45) NOT NULL,
    `EngineNumber` VARCHAR(45) NOT NULL,
    `RegistrationProvince` VARCHAR(45) NOT NULL,
    `OwnerName` VARCHAR(45) NOT NULL,
    `Manufacturer` VARCHAR(45) NOT NULL,
    `Model` VARCHAR(45) NOT NULL,
    `Year` VARCHAR(45) NOT NULL,
    `EngineCC` VARCHAR(45) NOT NULL,
    `DriverID` INTEGER NOT NULL,

    INDEX `DriverID`(`DriverID`),
    PRIMARY KEY (`vehicleID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `referrals` ADD CONSTRAINT `referrals_ibfk_1` FOREIGN KEY (`FromUserID`) REFERENCES `user`(`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `referrals` ADD CONSTRAINT `referrals_ibfk_2` FOREIGN KEY (`ToUserID`) REFERENCES `user`(`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ride` ADD CONSTRAINT `ride_ibfk_1` FOREIGN KEY (`DriverID`) REFERENCES `driver`(`DriverID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ride` ADD CONSTRAINT `ride_ibfk_2` FOREIGN KEY (`numberOfPeople`) REFERENCES `user`(`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rideinfo` ADD CONSTRAINT `rideinfo_ibfk_1` FOREIGN KEY (`RideID`) REFERENCES `ride`(`RideID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rideinfo` ADD CONSTRAINT `rideinfo_ibfk_2` FOREIGN KEY (`PassengerID`) REFERENCES `user`(`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rideinfo` ADD CONSTRAINT `rideinfo_ibfk_3` FOREIGN KEY (`DriverID`) REFERENCES `driver`(`DriverID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rideinfo` ADD CONSTRAINT `rideinfo_ibfk_4` FOREIGN KEY (`StatusID`) REFERENCES `status`(`statusID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ridenegotiation` ADD CONSTRAINT `ridenegotiation_ibfk_1` FOREIGN KEY (`rideinfoID`) REFERENCES `rideinfo`(`idRideInfo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`instituteID`) REFERENCES `institute`(`InstituteID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`levelID`) REFERENCES `level`(`LevelID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `vehicle` ADD CONSTRAINT `vehicle_ibfk_1` FOREIGN KEY (`DriverID`) REFERENCES `driver`(`DriverID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
